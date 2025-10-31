// Weather-based crop recommendations and alert generation
// Analyzes weather data and generates actionable recommendations for farmers

export async function generateRecommendations(env, farmId, weatherData) {
  const recommendations = [];
  const alerts = [];
  
  if (!weatherData || weatherData.length === 0) {
    return { recommendations, alerts };
  }
  
  // Get current weather (latest entry)
  const currentWeather = weatherData[0];
  const forecastWeather = weatherData.slice(0, 7); // Next 7 days
  
  // Temperature-based recommendations and alerts
  const tempRecommendations = analyzeTemperature(currentWeather, forecastWeather);
  recommendations.push(...tempRecommendations.recommendations);
  alerts.push(...tempRecommendations.alerts);
  
  // Precipitation-based recommendations
  const precipRecommendations = analyzePrecipitation(currentWeather, forecastWeather);
  recommendations.push(...precipRecommendations.recommendations);
  alerts.push(...precipRecommendations.alerts);
  
  // Wind-based recommendations
  const windRecommendations = analyzeWind(currentWeather, forecastWeather);
  recommendations.push(...windRecommendations.recommendations);
  alerts.push(...windRecommendations.alerts);
  
  // Humidity-based recommendations
  const humidityRecommendations = analyzeHumidity(currentWeather, forecastWeather);
  recommendations.push(...humidityRecommendations.recommendations);
  alerts.push(...humidityRecommendations.alerts);
  
  // Store alerts in database
  if (alerts.length > 0) {
    await storeAlerts(env, farmId, alerts);
  }
  
  // Store recommendations in database
  if (recommendations.length > 0) {
    await storeRecommendations(env, farmId, recommendations);
  }
  
  return { recommendations, alerts };
}

function analyzeTemperature(currentWeather, forecastWeather) {
  const recommendations = [];
  const alerts = [];
  
  // Check for frost conditions
  const minTemps = forecastWeather.map(w => w.temperature_min).filter(t => t !== null);
  const predictedMinTemp = Math.min(...minTemps);
  
  if (predictedMinTemp <= 0) {
    const severity = predictedMinTemp <= -5 ? 'critical' : predictedMinTemp <= -2 ? 'high' : 'medium';
    
    alerts.push({
      type: 'frost',
      severity,
      title: 'Frost Warning',
      message: `Frost conditions expected. Minimum temperature will reach ${predictedMinTemp}°C.`,
      trigger_conditions: { min_temperature: predictedMinTemp },
      recommended_actions: [
        'Cover sensitive crops with frost cloth',
        'Use irrigation to protect crops (if feasible)',
        'Harvest ready crops immediately',
        'Postpone planting of sensitive crops'
      ]
    });
  }
  
  // Check for heat stress
  const maxTemps = forecastWeather.map(w => w.temperature_max).filter(t => t !== null);
  const predictedMaxTemp = Math.max(...maxTemps);
  
  if (predictedMaxTemp >= 35) {
    const severity = predictedMaxTemp >= 40 ? 'critical' : 'high';
    
    alerts.push({
      type: 'heat',
      severity,
      title: 'Heat Stress Warning',
      message: `Extreme heat expected. Maximum temperature will reach ${predictedMaxTemp}°C.`,
      trigger_conditions: { max_temperature: predictedMaxTemp },
      recommended_actions: [
        'Increase irrigation frequency',
        'Provide shade for sensitive crops',
        'Harvest crops during cooler hours',
        'Avoid applying pesticides during peak heat'
      ]
    });
    
    recommendations.push({
      type: 'irrigation',
      priority: 'high',
      title: 'Increase Irrigation During Heat',
      description: 'With extreme temperatures predicted, increase irrigation to prevent crop stress.',
      urgency_days: 3,
      weather_trigger: { max_temperature: predictedMaxTemp },
      action_items: [
        'Increase irrigation frequency by 50%',
        'Water during early morning and evening',
        'Monitor soil moisture levels'
      ],
      expected_impact: 'Prevent heat stress and maintain crop health'
    });
  }
  
  // Temperature range recommendations
  const avgTemp = forecastWeather.reduce((sum, w) => sum + (w.temperature_avg || 0), 0) / forecastWeather.length;
  
  if (avgTemp >= 20 && avgTemp <= 28) {
    recommendations.push({
      type: 'general',
      priority: 'medium',
      title: 'Optimal Growing Conditions',
      description: 'Temperature conditions are optimal for most crop growth.',
      urgency_days: 7,
      weather_trigger: { average_temperature: avgTemp },
      action_items: [
        'This is an excellent time for planting',
        'Monitor for rapid growth',
        'Prepare for increased nutrient demands'
      ],
      expected_impact: 'Maximize crop growth rate and yield potential'
    });
  }
  
  return { recommendations, alerts };
}

function analyzePrecipitation(currentWeather, forecastWeather) {
  const recommendations = [];
  const alerts = [];
  
  // Check for heavy rain
  const dailyPrecip = forecastWeather.map(w => w.precipitation_sum || 0);
  const maxDailyPrecip = Math.max(...dailyPrecip);
  const totalPrecip = dailyPrecip.reduce((sum, p) => sum + p, 0);
  
  if (maxDailyPrecip >= 25) {
    const severity = maxDailyPrecip >= 50 ? 'critical' : 'high';
    
    alerts.push({
      type: 'heavy_rain',
      severity,
      title: 'Heavy Rain Warning',
      message: `Heavy rainfall expected. Up to ${maxDailyPrecip}mm in a single day.`,
      trigger_conditions: { max_daily_precipitation: maxDailyPrecip },
      recommended_actions: [
        'Ensure proper field drainage',
        'Avoid field operations',
        'Protect stored crops and equipment',
        'Check for soil erosion'
      ]
    });
    
    recommendations.push({
      type: 'field_operations',
      priority: 'high',
      title: 'Postpone Field Operations',
      description: 'Heavy rainfall expected. Postpone all field operations.',
      urgency_days: 2,
      weather_trigger: { max_daily_precipitation: maxDailyPrecip },
      action_items: [
        'Delay planting operations',
        'Postpone fertilizer application',
        'Secure equipment and inputs',
        'Check drainage systems'
      ],
      expected_impact: 'Prevent equipment damage and input waste'
    });
  }
  
  // Drought conditions
  if (totalPrecip < 5 && dailyPrecip.every(p => p < 2)) {
    recommendations.push({
      type: 'irrigation',
      priority: 'high',
      title: 'Increase Irrigation',
      description: 'Little to no rain predicted over the next week. Increase irrigation.',
      urgency_days: 5,
      weather_trigger: { total_precipitation_week: totalPrecip },
      action_items: [
        'Increase irrigation frequency',
        'Monitor soil moisture daily',
        'Prioritize water for most critical crops',
        'Consider drought-resistant varieties for future planting'
      ],
      expected_impact: 'Prevent crop stress and maintain yields'
    });
  }
  
  // Optimal rain conditions
  if (totalPrecip >= 15 && totalPrecip <= 40) {
    recommendations.push({
      type: 'fertilization',
      priority: 'medium',
      title: 'Apply Fertilizer with Rain',
      description: 'Moderate rainfall expected. Good time for fertilizer application.',
      urgency_days: 3,
      weather_trigger: { total_precipitation_week: totalPrecip },
      action_items: [
        'Apply nitrogen fertilizers before rain',
        'Incorporate fertilizer into soil',
        'Monitor runoff to prevent nutrient loss'
      ],
      expected_impact: 'Maximize fertilizer effectiveness and reduce waste'
    });
  }
  
  return { recommendations, alerts };
}

function analyzeWind(currentWeather, forecastWeather) {
  const recommendations = [];
  const alerts = [];
  
  const maxWindSpeeds = forecastWeather.map(w => w.wind_speed_max).filter(w => w !== null);
  const maxWindSpeed = Math.max(...maxWindSpeeds);
  
  if (maxWindSpeed >= 50) {
    const severity = maxWindSpeed >= 70 ? 'critical' : 'high';
    
    alerts.push({
      type: 'high_wind',
      severity,
      title: 'High Wind Warning',
      message: `Strong winds expected up to ${maxWindSpeed} km/h.`,
      trigger_conditions: { max_wind_speed: maxWindSpeed },
      recommended_actions: [
        'Secure lightweight equipment and structures',
        'Postpone spraying operations',
        'Protect young plants with stakes',
        'Check tree support systems'
      ]
    });
  }
  
  if (maxWindSpeed >= 25 && maxWindSpeed < 50) {
    recommendations.push({
      type: 'pest_control',
      priority: 'medium',
      title: 'Delay Spraying Operations',
      description: 'Moderate winds may cause spray drift. Delay pesticide application.',
      urgency_days: 1,
      weather_trigger: { max_wind_speed: maxWindSpeed },
      action_items: [
        'Wait for calmer weather',
        'Use lower spray pressure if spraying is urgent',
        'Consider wind direction for application timing'
      ],
      expected_impact: 'Prevent pesticide drift and ensure effective application'
    });
  }
  
  return { recommendations, alerts };
}

function analyzeHumidity(currentWeather, forecastWeather) {
  const recommendations = [];
  const alerts = [];
  
  // High humidity conditions (good for disease)
  const avgHumidity = forecastWeather.reduce((sum, w) => {
    return sum + ((w.relative_humidity_max || 0) + (w.relative_humidity_min || 0)) / 2;
  }, 0) / forecastWeather.length;
  
  if (avgHumidity >= 85) {
    recommendations.push({
      type: 'disease_prevention',
      priority: 'high',
      title: 'Monitor for Fungal Diseases',
      description: 'High humidity conditions favor fungal diseases. Increase monitoring.',
      urgency_days: 5,
      weather_trigger: { average_humidity: avgHumidity },
      action_items: [
        'Inspect crops daily for disease symptoms',
        'Improve air circulation if possible',
        'Consider preventive fungicide application',
        'Remove any infected plant material'
      ],
      expected_impact: 'Early disease detection and prevention'
    });
  }
  
  // Low humidity conditions (high evapotranspiration)
  const avgET0 = forecastWeather.reduce((sum, w) => sum + (w.et0_fao_evapotranspiration || 0), 0) / forecastWeather.length;
  
  if (avgET0 >= 5 && avgHumidity <= 40) {
    recommendations.push({
      type: 'irrigation',
      priority: 'high',
      title: 'High Evapotranspiration Conditions',
      description: 'High water loss through evaporation. Increase irrigation.',
      urgency_days: 3,
      weather_trigger: { average_et0: avgET0, average_humidity: avgHumidity },
      action_items: [
        'Increase irrigation frequency',
        'Water early morning or late evening',
        'Mulch around plants to retain moisture',
        'Monitor soil moisture levels'
      ],
      expected_impact: 'Prevent water stress and maintain crop health'
    });
  }
  
  return { recommendations, alerts };
}

async function storeAlerts(env, farmId, alerts) {
  for (const alert of alerts) {
    try {
      // Check if similar alert already exists (avoid duplicates)
      const existingQuery = `
        SELECT id FROM weather_alerts
        WHERE farm_id = ? AND alert_type = ? AND is_active = 1
        AND triggered_at > datetime('now', '-1 day')
      `;
      
      const { results: existing } = await env.DB.prepare(existingQuery)
        .bind(farmId, alert.type)
        .all();
      
      if (existing.length === 0) {
        const insertQuery = `
          INSERT INTO weather_alerts (
            farm_id, alert_type, severity, title, message, trigger_conditions,
            recommended_actions, is_active, triggered_at, expires_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now', '+7 days'))
        `;
        
        await env.DB.prepare(insertQuery)
          .bind(
            farmId,
            alert.type,
            alert.severity,
            alert.title,
            alert.message,
            JSON.stringify(alert.trigger_conditions),
            JSON.stringify(alert.recommended_actions)
          ).run();
      }
    } catch (error) {
      console.error('Failed to store alert:', error);
    }
  }
}

async function storeRecommendations(env, farmId, recommendations) {
  for (const rec of recommendations) {
    try {
      // Check if similar recommendation already exists
      const existingQuery = `
        SELECT id FROM weather_recommendations
        WHERE farm_id = ? AND recommendation_type = ? AND is_active = 1
        AND created_at > datetime('now', '-1 day')
      `;
      
      const { results: existing } = await env.DB.prepare(existingQuery)
        .bind(farmId, rec.type)
        .all();
      
      if (existing.length === 0) {
        const insertQuery = `
          INSERT INTO weather_recommendations (
            farm_id, recommendation_type, title, description, priority,
            urgency_days, weather_trigger, action_items, expected_impact,
            is_active, expires_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now', '+' || ? || ' days'))
        `;
        
        await env.DB.prepare(insertQuery)
          .bind(
            farmId,
            rec.type,
            rec.title,
            rec.description,
            rec.priority,
            rec.urgency_days,
            JSON.stringify(rec.weather_trigger),
            JSON.stringify(rec.action_items),
            rec.expected_impact,
            rec.urgency_days
          ).run();
      }
    } catch (error) {
      console.error('Failed to store recommendation:', error);
    }
  }
}