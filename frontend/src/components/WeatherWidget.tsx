import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Thermometer, 
  Droplets,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface WeatherData {
  data_date: string;
  temperature_max: number | null;
  temperature_min: number | null;
  temperature_avg: number | null;
  precipitation_sum: number;
  relative_humidity_max: number | null;
  relative_humidity_min: number | null;
  wind_speed_max: number | null;
  wind_speed_avg: number | null;
  et0_fao_evapotranspiration: number | null;
  weather_description: string;
}

interface WeatherRecommendation {
  id: string;
  recommendation_type: string;
  title: string;
  description: string;
  priority: string;
  urgency_days: number;
  action_items: string[];
  expected_impact: string;
}

interface WeatherAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  message: string;
  acknowledged_at: string | null;
  triggered_at: string;
}

interface WeatherWidgetProps {
  farmId: string;
  showRecommendations?: boolean;
  showAlerts?: boolean;
}

export function WeatherWidget({ farmId, showRecommendations = true, showAlerts = true }: WeatherWidgetProps) {
  const { getAuthHeaders } = useAuth();

  // Fetch weather data
  const { data: weatherData, isLoading: weatherLoading, refetch: refetchWeather } = useQuery({
    queryKey: ['weather', farmId],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/weather/farm?farm_id=${farmId}&days=7`, { headers });
      if (!response.ok) throw new Error('Failed to fetch weather data');
      return response.json();
    },
    enabled: !!farmId,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });

  // Fetch weather alerts
  const { data: alerts } = useQuery({
    queryKey: ['weather-alerts', farmId],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/weather/alerts', { headers });
      if (!response.ok) throw new Error('Failed to fetch weather alerts');
      return response.json() as Promise<WeatherAlert[]>;
    },
    enabled: showAlerts && !!farmId,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Fetch weather recommendations
  const { data: recommendations } = useQuery({
    queryKey: ['weather-recommendations', farmId],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/weather/recommendations', { headers });
      if (!response.ok) throw new Error('Failed to fetch weather recommendations');
      return response.json() as Promise<WeatherRecommendation[]>;
    },
    enabled: showRecommendations && !!farmId,
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
  });

  const getWeatherIcon = (precipitation: number, weatherDescription: string) => {
    if (precipitation > 5) return <CloudRain className="h-6 w-6 text-blue-500" />;
    if (precipitation > 0) return <Cloud className="h-6 w-6 text-gray-500" />;
    return <Sun className="h-6 w-6 text-yellow-500" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  if (weatherLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            Loading weather data...
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentWeather = weatherData?.weather?.[0];
  const unacknowledgedAlerts = alerts?.filter(alert => !alert.acknowledged_at) || [];

  return (
    <div className="space-y-4">
      {/* Current Weather Display */}
      {currentWeather && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Weather Forecast
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => refetchWeather()}
                disabled={weatherLoading}
              >
                <RefreshCw className={`h-4 w-4 ${weatherLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                {getWeatherIcon(currentWeather.precipitation_sum, currentWeather.weather_description)}
                <div>
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="font-medium">
                    {currentWeather.temperature_max}° / {currentWeather.temperature_min}°
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Rainfall</p>
                  <p className="font-medium">{currentWeather.precipitation_sum}mm</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Wind className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Wind</p>
                  <p className="font-medium">{currentWeather.wind_speed_max} km/h</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="font-medium">
                    {currentWeather.relative_humidity_max}%
                  </p>
                </div>
              </div>
            </div>
            
            {/* 7-day forecast */}
            {weatherData.weather?.length > 1 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">7-Day Forecast</h4>
                <div className="grid grid-cols-7 gap-2">
                  {weatherData.weather.slice(0, 7).map((day: WeatherData, index: number) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-gray-600">
                        {index === 0 ? 'Today' : new Date(day.data_date).toLocaleDateString('en', { weekday: 'short' })}
                      </p>
                      <div className="my-1">
                        {getWeatherIcon(day.precipitation_sum, day.weather_description)}
                      </div>
                      <p className="text-xs font-medium">
                        {day.temperature_max}°/{day.temperature_min}°
                      </p>
                      <p className="text-xs text-blue-600">{day.precipitation_sum}mm</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Weather Alerts */}
      {showAlerts && unacknowledgedAlerts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Weather Alerts ({unacknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unacknowledgedAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Badge className={`${getSeverityColor(alert.severity)} text-white mb-1`}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <h4 className="font-medium text-red-800">{alert.title}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-red-700 mb-2">{alert.message}</p>
                  <p className="text-xs text-red-600">
                    Triggered: {new Date(alert.triggered_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weather Recommendations */}
      {showRecommendations && recommendations && recommendations.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Weather Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getPriorityColor(rec.priority)} text-white`}>
                        {rec.priority}
                      </Badge>
                      <h4 className="font-medium text-green-800">{rec.title}</h4>
                    </div>
                    <span className="text-xs text-green-600">
                      {rec.urgency_days} days
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mb-2">{rec.description}</p>
                  <div className="text-xs text-green-600">
                    <p className="font-medium mb-1">Actions:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {rec.action_items.slice(0, 2).map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default WeatherWidget;