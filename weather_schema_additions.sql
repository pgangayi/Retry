-- Weather Integration - Database Schema Additions
-- Add location data to farms and weather data storage

-- Add location fields to existing farms table
ALTER TABLE farms ADD COLUMN latitude REAL;
ALTER TABLE farms ADD COLUMN longitude REAL;
ALTER TABLE farms ADD COLUMN timezone TEXT;
ALTER TABLE farms ADD COLUMN location_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Create weather_data table for storing weather information
CREATE TABLE weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    data_date DATE NOT NULL,
    -- Daily aggregated data
    temperature_max REAL,
    temperature_min REAL,
    temperature_avg REAL,
    precipitation_sum REAL,
    precipitation_hours REAL,
    snowfall_sum REAL,
    -- Hourly data (JSON array for detailed hourly breakdown)
    hourly_data TEXT, -- JSON string with hourly temperature, humidity, precipitation
    -- Additional agricultural metrics
    relative_humidity_max REAL,
    relative_humidity_min REAL,
    wind_speed_max REAL,
    wind_speed_avg REAL,
    wind_direction_avg REAL,
    shortwave_radiation_sum REAL, -- Solar radiation MJ/m²
    et0_fao_evapotranspiration REAL, -- Reference evapotranspiration
    soil_temperature_0_to_7cm_avg REAL,
    -- Weather condition summary
    weather_code INTEGER, -- Open-Meteo weather code
    weather_description TEXT,
    sunrise_time DATETIME,
    sunset_time DATETIME,
    -- Data source and metadata
    data_source TEXT DEFAULT 'open-meteo',
    forecast_days INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id)
);

-- Create index for better performance
CREATE INDEX idx_weather_data_farm_date ON weather_data(farm_id, data_date);
CREATE INDEX idx_weather_data_created_at ON weather_data(created_at);
CREATE INDEX idx_weather_data_farm_created ON weather_data(farm_id, created_at);

-- Weather alerts and recommendations table
CREATE TABLE weather_alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    alert_type TEXT NOT NULL, -- 'frost', 'heat', 'drought', 'heavy_rain', 'high_wind'
    severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    trigger_conditions TEXT, -- JSON with trigger conditions
    recommended_actions TEXT, -- JSON with recommended actions
    is_active BOOLEAN DEFAULT 1,
    triggered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    acknowledged_at DATETIME,
    acknowledged_by TEXT, -- user_id
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (acknowledged_by) REFERENCES users(id)
);

-- Weather-based crop recommendations table
CREATE TABLE weather_recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    field_id INTEGER,
    crop_type_id INTEGER,
    recommendation_type TEXT NOT NULL, -- 'irrigation', 'fertilization', 'pest_control', 'harvest_timing'
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    urgency_days INTEGER DEFAULT 7, -- How many days this recommendation is valid
    weather_trigger TEXT, -- JSON with weather conditions that triggered this
    action_items TEXT, -- JSON array of specific actions
    expected_impact TEXT, -- Description of expected benefits
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (field_id) REFERENCES fields(id),
    FOREIGN KEY (crop_type_id) REFERENCES crop_types(id)
);

-- Indexes for weather alerts and recommendations
CREATE INDEX idx_weather_alerts_farm_active ON weather_alerts(farm_id, is_active);
CREATE INDEX idx_weather_alerts_created_at ON weather_alerts(created_at);
CREATE INDEX idx_weather_recommendations_farm_active ON weather_recommendations(farm_id, is_active);
CREATE INDEX idx_weather_recommendations_expires ON weather_recommendations(expires_at);

-- Sample data for testing (optional farms with coordinates)
-- You can populate this later with actual farm locations
/*
UPDATE farms SET 
  latitude = -1.2921,  -- Example: Nairobi, Kenya
  longitude = 36.8219,
  timezone = 'Africa/Nairobi'
WHERE id = 1;

UPDATE farms SET 
  latitude = 40.7128,  -- Example: New York, USA
  longitude = -74.0060,
  timezone = 'America/New_York'
WHERE id = 2;
*/