// Cloudflare Pages Function for Weather API using Open-Meteo
// Handles weather data fetching, storage, and agricultural recommendations

import { generateRecommendations } from './weather-recommendations.js';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;

  try {
    // Validate JWT authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify and extract user from token
    const { AuthUtils } = await import('./_auth.js');
    const auth = new AuthUtils(env);
    const user = await auth.getUserFromToken(request);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const userId = user.id;

    if (method === 'GET') {
      const endpoint = url.pathname.split('/').pop();
      
      if (endpoint === 'farm') {
        // Get weather data for user's farms
        const farmId = url.searchParams.get('farm_id');
        const days = parseInt(url.searchParams.get('days') || '7');
        
        if (!farmId) {
          return new Response(JSON.stringify({ error: 'Farm ID required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Verify user has access to farm
        const accessQuery = `
          SELECT f.id, f.latitude, f.longitude, f.timezone FROM farms f
          JOIN farm_members fmem ON f.id = fmem.farm_id
          WHERE f.id = ? AND fmem.user_id = ?
        `;
        
        const { results: farmAccess } = await env.DB.prepare(accessQuery).bind(farmId, userId).all();
        
        if (!farmAccess || farmAccess.length === 0) {
          return new Response(JSON.stringify({ error: 'Access denied' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        const farm = farmAccess[0];
        
        if (!farm.latitude || !farm.longitude) {
          return new Response(JSON.stringify({ error: 'Farm location not set. Please add coordinates to your farm.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Get weather data from database first (for recent data)
        const weatherQuery = `
          SELECT * FROM weather_data
          WHERE farm_id = ? AND data_date >= date('now', '-' || ? || ' days')
          ORDER BY data_date DESC
        `;
        
        const { results: weatherHistory } = await env.DB.prepare(weatherQuery).bind(farmId, days).all();
        
        // If we have recent data, check if we need to update
        const latestWeather = weatherHistory[0];
        const needsUpdate = !latestWeather || 
          new Date(latestWeather.created_at).getTime() < Date.now() - (6 * 60 * 60 * 1000); // 6 hours old
        
        if (needsUpdate) {
          // Fetch fresh weather data from Open-Meteo
          const weatherService = new WeatherService(env);
          await weatherService.updateFarmWeatherData(farmId, farm.latitude, farm.longitude, days);
          
          // Get updated data
          const { results: updatedWeather } = await env.DB.prepare(weatherQuery).bind(farmId, days).all();
          
          // Generate weather-based recommendations
          const recommendations = await generateRecommendations(env, farmId, updatedWeather);
          
          return new Response(JSON.stringify({
            weather: updatedWeather,
            recommendations: recommendations,
            last_updated: new Date().toISOString()
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          // Generate recommendations for existing data
          const recommendations = await generateRecommendations(env, farmId, weatherHistory);
          
          return new Response(JSON.stringify({
            weather: weatherHistory,
            recommendations: recommendations,
            last_updated: latestWeather.created_at
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      if (endpoint === 'alerts') {
        // Get weather alerts for user's farms
        const alertsQuery = `
          SELECT wa.*, f.name as farm_name
          FROM weather_alerts wa
          JOIN farms f ON wa.farm_id = f.id
          JOIN farm_members fmem ON f.id = fmem.farm_id
          WHERE fmem.user_id = ? AND wa.is_active = 1
          ORDER BY wa.triggered_at DESC
        `;
        
        const { results: alerts } = await env.DB.prepare(alertsQuery).bind(userId).all();
        
        return new Response(JSON.stringify(alerts), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      if (endpoint === 'recommendations') {
        // Get weather recommendations for user's farms
        const recommendationsQuery = `
          SELECT wr.*, f.name as farm_name, fi.name as field_name, ct.name as crop_type_name
          FROM weather_recommendations wr
          JOIN farms f ON wr.farm_id = f.id
          LEFT JOIN fields fi ON wr.field_id = fi.id
          LEFT JOIN crop_types ct ON wr.crop_type_id = ct.id
          JOIN farm_members fmem ON f.id = fmem.farm_id
          WHERE fmem.user_id = ? AND wr.is_active = 1 AND (wr.expires_at IS NULL OR wr.expires_at > datetime('now'))
          ORDER BY wr.priority DESC, wr.created_at DESC
        `;
        
        const { results: recommendations } = await env.DB.prepare(recommendationsQuery).bind(userId).all();
        
        // Parse JSON fields
        const parsedRecommendations = recommendations.map(rec => ({
          ...rec,
          weather_trigger: rec.weather_trigger ? JSON.parse(rec.weather_trigger) : null,
          action_items: rec.action_items ? JSON.parse(rec.action_items) : []
        }));
        
        return new Response(JSON.stringify(parsedRecommendations), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else if (method === 'POST') {
      const body = await request.json();
      const { action } = body;
      
      if (action === 'update_farm_location') {
        // Update farm location coordinates
        const { farm_id, latitude, longitude, timezone } = body;
        
        if (!farm_id || latitude === undefined || longitude === undefined) {
          return new Response(JSON.stringify({ error: 'Farm ID, latitude, and longitude required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Verify user has access to farm
        const accessQuery = `
          SELECT id FROM farm_members
          WHERE farm_id = ? AND user_id = ?
        `;
        
        const { results: farmAccess } = await env.DB.prepare(accessQuery).bind(farm_id, userId).all();
        
        if (!farmAccess || farmAccess.length === 0) {
          return new Response(JSON.stringify({ error: 'Access denied' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Update farm location
        const updateQuery = `
          UPDATE farms SET 
            latitude = ?, longitude = ?, timezone = ?, location_updated_at = datetime('now')
          WHERE id = ?
        `;
        
        const result = await env.DB.prepare(updateQuery)
          .bind(latitude, longitude, timezone || null, farm_id)
          .run();
        
        if (!result.success) {
          return new Response(JSON.stringify({ error: 'Failed to update farm location' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Immediately fetch weather data for the updated farm
        const weatherService = new WeatherService(env);
        await weatherService.updateFarmWeatherData(farm_id, latitude, longitude, 7);
        
        return new Response(JSON.stringify({
          message: 'Farm location updated successfully',
          weather_updated: true
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      if (action === 'acknowledge_alert') {
        // Mark weather alert as acknowledged
        const { alert_id } = body;
        
        if (!alert_id) {
          return new Response(JSON.stringify({ error: 'Alert ID required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        const updateQuery = `
          UPDATE weather_alerts SET 
            acknowledged_at = datetime('now'), acknowledged_by = ?
          WHERE id = ? AND farm_id IN (
            SELECT farm_id FROM farm_members WHERE user_id = ?
          )
        `;
        
        const result = await env.DB.prepare(updateQuery)
          .bind(userId, alert_id, userId)
          .run();
        
        if (!result.success) {
          return new Response(JSON.stringify({ error: 'Failed to acknowledge alert' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        return new Response(JSON.stringify({
          message: 'Alert acknowledged successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
  } catch (error) {
    console.error('Weather API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Weather Service Class for handling Open-Meteo integration
class WeatherService {
  constructor(env) {
    this.env = env;
  }
  
  async fetchFromOpenMeteo(latitude, longitude, days = 7) {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast';
    
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,shortwave_radiation,et0_fao_evapotranspiration,soil_temperature_0_to_7cm',
      daily: 'temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,precipitation_hours,snowfall_sum,wind_speed_10m_max,wind_speed_10m_mean,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration,soil_temperature_0_to_7cm_mean',
      timezone: 'auto',
      forecast_days: days.toString()
    });
    
    const url = `${baseUrl}?${params.toString()}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  async updateFarmWeatherData(farmId, latitude, longitude, days = 7) {
    try {
      // Fetch weather data from Open-Meteo
      const weatherData = await this.fetchFromOpenMeteo(latitude, longitude, days);
      
      // Process and store daily weather data
      if (weatherData.daily && weatherData.daily.time) {
        for (let i = 0; i < weatherData.daily.time.length; i++) {
          const date = weatherData.daily.time[i];
          
          // Get corresponding hourly data for this day
          const hourlyData = weatherData.hourly ? {
            temperature_2m: weatherData.hourly.temperature_2m?.slice(i * 24, (i + 1) * 24) || [],
            relative_humidity_2m: weatherData.hourly.relative_humidity_2m?.slice(i * 24, (i + 1) * 24) || [],
            precipitation: weatherData.hourly.precipitation?.slice(i * 24, (i + 1) * 24) || [],
            wind_speed_10m: weatherData.hourly.wind_speed_10m?.slice(i * 24, (i + 1) * 24) || [],
            shortwave_radiation: weatherData.hourly.shortwave_radiation?.slice(i * 24, (i + 1) * 24) || []
          } : null;
          
          // Insert weather data
          const insertQuery = `
            INSERT INTO weather_data (
              farm_id, data_date, temperature_max, temperature_min, temperature_avg,
              precipitation_sum, precipitation_hours, snowfall_sum, hourly_data,
              relative_humidity_max, relative_humidity_min, wind_speed_max, wind_speed_avg,
              wind_direction_avg, shortwave_radiation_sum, et0_fao_evapotranspiration,
              soil_temperature_0_to_7cm_avg, weather_code, weather_description,
              data_source, forecast_days, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open-meteo', ?, datetime('now'))
          `;
          
          await this.env.DB.prepare(insertQuery)
            .bind(
              farmId,
              date,
              weatherData.daily.temperature_2m_max?.[i] || null,
              weatherData.daily.temperature_2m_min?.[i] || null,
              weatherData.daily.temperature_2m_mean?.[i] || null,
              weatherData.daily.precipitation_sum?.[i] || 0,
              weatherData.daily.precipitation_hours?.[i] || 0,
              weatherData.daily.snowfall_sum?.[i] || 0,
              hourlyData ? JSON.stringify(hourlyData) : null,
              null, // Will be calculated from hourly data
              null, // Will be calculated from hourly data
              weatherData.daily.wind_speed_10m_max?.[i] || null,
              weatherData.daily.wind_speed_10m_mean?.[i] || null,
              weatherData.daily.wind_direction_10m_dominant?.[i] || null,
              weatherData.daily.shortwave_radiation_sum?.[i] || null,
              weatherData.daily.et0_fao_evapotranspiration?.[i] || null,
              weatherData.daily.soil_temperature_0_to_7cm_mean?.[i] || null,
              null, // Weather code from Open-Meteo (not in basic plan)
              null, // Weather description
              days
            ).run();
        }
      }
      
      return true;
    } catch (error) {
      console.error(`Failed to update weather data for farm ${farmId}:`, error);
      throw error;
    }
  }
  
  getWeatherDescription(weatherCode) {
    // Basic weather code descriptions (Open-Meteo WMO weather interpretation codes)
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    
    return descriptions[weatherCode] || 'Unknown';
  }
}