-- Crop Management Module - Database Schema Additions
-- This file contains additional tables for comprehensive crop management

-- Crop types and varieties master data
CREATE TABLE crop_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'cereal', 'vegetable', 'fruit', 'legume', 'oilseed'
    description TEXT,
    growth_days_min INTEGER, -- Minimum days to maturity
    growth_days_max INTEGER, -- Maximum days to maturity
    planting_depth_cm REAL,
    row_spacing_cm REAL,
    plant_spacing_cm REAL,
    optimal_temperature_min REAL, -- Celsius
    optimal_temperature_max REAL,
    water_requirements_mm REAL, -- Annual water needs
    soil_ph_min REAL,
    soil_ph_max REAL,
    nutrient_requirements TEXT, -- JSON with NPK requirements
    common_pests TEXT, -- JSON array of common pests
    common_diseases TEXT, -- JSON array of common diseases
    harvest_indicators TEXT, -- JSON array of harvest signs
    storage_requirements TEXT, -- JSON with storage guidelines
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crop varieties (specific cultivars)
CREATE TABLE crop_varieties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    crop_type_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    resistance_traits TEXT, -- JSON array of disease/pest resistance
    yield_potential REAL, -- tons per hectare
    maturity_days INTEGER,
    drought_tolerance TEXT, -- 'low', 'medium', 'high'
    disease_resistance TEXT, -- JSON object with disease resistance scores
    climate_suitability TEXT, -- JSON with suitable climate zones
    seed_suppliers TEXT, -- JSON array of supplier information
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (crop_type_id) REFERENCES crop_types(id)
);

-- Enhanced fields with crop planning
ALTER TABLE fields ADD COLUMN crop_variety_id INTEGER;
ALTER TABLE fields ADD COLUMN planting_date DATE;
ALTER TABLE fields ADD COLUMN expected_harvest_date DATE;
ALTER TABLE fields ADD COLUMN actual_harvest_date DATE;
ALTER TABLE fields ADD COLUMN planting_method TEXT; -- 'direct_seeding', 'transplanting'
ALTER TABLE fields ADD COLUMN seed_rate_kg_ha REAL;
ALTER TABLE fields ADD COLUMN expected_yield_tons REAL;
ALTER TABLE fields ADD COLUMN actual_yield_tons REAL;
ALTER TABLE fields ADD COLUMN soil_type TEXT;
ALTER TABLE fields ADD COLUMN irrigation_type TEXT; -- 'rainfed', 'drip', 'sprinkler', 'flood'
ALTER TABLE fields ADD COLUMN fertilizer_plan TEXT; -- JSON with fertilizer schedule
ALTER TABLE fields ADD COLUMN pesticide_plan TEXT; -- JSON with pesticide schedule

ALTER TABLE fields ADD FOREIGN KEY (crop_variety_id) REFERENCES crop_varieties(id);

-- Crop operations/tasks
CREATE TABLE crop_operations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    field_id INTEGER NOT NULL,
    farm_id INTEGER NOT NULL,
    operation_type TEXT NOT NULL, -- 'planting', 'fertilizing', 'pest_control', 'irrigation', 'harvesting', 'cultivation'
    operation_name TEXT NOT NULL,
    scheduled_date DATE NOT NULL,
    completed_date DATE,
    status TEXT DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'skipped'
    operator TEXT, -- user_id who performed the operation
    equipment_used TEXT,
    input_used TEXT, -- JSON with fertilizers, pesticides, seeds used
    cost REAL,
    weather_conditions TEXT,
    notes TEXT,
    created_by TEXT NOT NULL, -- user_id
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (field_id) REFERENCES fields(id),
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Crop growth monitoring
CREATE TABLE crop_observations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    field_id INTEGER NOT NULL,
    crop_variety_id INTEGER NOT NULL,
    observation_date DATE NOT NULL,
    growth_stage TEXT, -- 'germination', 'vegetative', 'flowering', 'fruiting', 'maturity'
    plant_height_cm REAL,
    leaf_color TEXT, -- 'pale', 'normal', 'dark'
    pest_presence TEXT, -- JSON array of pests observed
    disease_presence TEXT, -- JSON array of diseases observed
    weed_pressure TEXT, -- 'low', 'medium', 'high'
    soil_moisture TEXT, -- 'dry', 'moist', 'wet'
    plant_density_per_m2 INTEGER,
    uniformity_score INTEGER, -- 1-10 scale
    health_score INTEGER, -- 1-10 scale
    photos TEXT, -- JSON array of photo URLs
    notes TEXT,
    observer TEXT NOT NULL, -- user_id
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (field_id) REFERENCES fields(id),
    FOREIGN KEY (crop_variety_id) REFERENCES crop_varieties(id),
    FOREIGN KEY (observer) REFERENCES users(id)
);

-- Harvest records
CREATE TABLE harvest_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    field_id INTEGER NOT NULL,
    crop_variety_id INTEGER NOT NULL,
    harvest_date DATE NOT NULL,
    harvest_method TEXT, -- 'manual', 'mechanical'
    quantity_harvested REAL,
    unit TEXT NOT NULL, -- 'kg', 'tons', 'bags', etc.
    quality_grade TEXT, -- 'premium', 'grade_a', 'grade_b', 'reject'
    moisture_content REAL, -- percentage
    price_per_unit REAL,
    total_value REAL,
    storage_location TEXT,
    buyer_info TEXT,
    quality_notes TEXT,
    recorded_by TEXT NOT NULL, -- user_id
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (field_id) REFERENCES fields(id),
    FOREIGN KEY (crop_variety_id) REFERENCES crop_varieties(id),
    FOREIGN KEY (recorded_by) REFERENCES users(id)
);

-- Crop rotation planning
CREATE TABLE crop_rotations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    field_id INTEGER NOT NULL,
    sequence_year INTEGER NOT NULL, -- 1, 2, 3, 4 for 4-year rotation
    crop_variety_id INTEGER NOT NULL,
    planting_date DATE,
    harvest_date DATE,
    rotation_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (field_id) REFERENCES fields(id),
    FOREIGN KEY (crop_variety_id) REFERENCES crop_varieties(id)
);

-- Weather integration
CREATE TABLE weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    date DATE NOT NULL,
    temperature_max REAL,
    temperature_min REAL,
    temperature_avg REAL,
    rainfall_mm REAL,
    humidity_percent REAL,
    wind_speed_kmh REAL,
    sunshine_hours REAL,
    soil_temperature REAL,
    evaporation_mm REAL,
    data_source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id)
);

-- Indexes for performance
CREATE INDEX idx_crop_types_category ON crop_types(category);
CREATE INDEX idx_crop_types_name ON crop_types(name);

CREATE INDEX idx_crop_varieties_crop_type_id ON crop_varieties(crop_type_id);
CREATE INDEX idx_crop_varieties_name ON crop_varieties(name);

CREATE INDEX idx_fields_crop_variety_id ON fields(crop_variety_id);
CREATE INDEX idx_fields_planting_date ON fields(planting_date);
CREATE INDEX idx_fields_expected_harvest_date ON fields(expected_harvest_date);

CREATE INDEX idx_crop_operations_field_id ON crop_operations(field_id);
CREATE INDEX idx_crop_operations_farm_id ON crop_operations(farm_id);
CREATE INDEX idx_crop_operations_scheduled_date ON crop_operations(scheduled_date);
CREATE INDEX idx_crop_operations_status ON crop_operations(status);

CREATE INDEX idx_crop_observations_field_id ON crop_observations(field_id);
CREATE INDEX idx_crop_observations_date ON crop_observations(observation_date);
CREATE INDEX idx_crop_observations_growth_stage ON crop_observations(growth_stage);

CREATE INDEX idx_harvest_records_field_id ON harvest_records(field_id);
CREATE INDEX idx_harvest_records_harvest_date ON harvest_records(harvest_date);

CREATE INDEX idx_crop_rotations_field_id ON crop_rotations(field_id);
CREATE INDEX idx_crop_rotations_year ON crop_rotations(sequence_year);

CREATE INDEX idx_weather_data_farm_id ON weather_data(farm_id);
CREATE INDEX idx_weather_data_date ON weather_data(date);

-- Insert sample crop types data
INSERT INTO crop_types (name, category, description, growth_days_min, growth_days_max, optimal_temperature_min, optimal_temperature_max, water_requirements_mm, soil_ph_min, soil_ph_max) VALUES
('Maize', 'cereal', 'Staple cereal crop', 90, 120, 18, 32, 500, 5.5, 7.5),
('Wheat', 'cereal', 'Winter and spring wheat varieties', 120, 150, 12, 25, 450, 6.0, 7.5),
('Rice', 'cereal', 'Paddy rice cultivation', 100, 140, 20, 35, 900, 5.5, 6.5),
('Tomato', 'vegetable', 'Solanaceae vegetable crop', 60, 90, 18, 27, 600, 6.0, 7.0),
('Potato', 'vegetable', 'Root vegetable crop', 70, 120, 15, 20, 500, 5.0, 6.5),
('Cabbage', 'vegetable', 'Brassica leafy vegetable', 60, 90, 15, 20, 400, 6.0, 7.0),
('Onion', 'vegetable', 'Allium bulb vegetable', 90, 120, 13, 24, 350, 6.0, 7.0),
('Apple', 'fruit', 'Deciduous fruit tree', 180, 240, 15, 24, 700, 6.0, 7.0),
('Banana', 'fruit', 'Tropical fruit plant', 270, 365, 22, 30, 1200, 5.5, 7.0),
('Soybean', 'legume', 'Protein legume crop', 90, 130, 20, 30, 450, 6.0, 7.0);