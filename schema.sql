-- Farmers Boot D1 Database Schema
-- This schema defines the database structure for the Cloudflare D1 database

-- Users table (for user management)
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Farms table
CREATE TABLE farms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    location TEXT,
    area_hectares REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Farm members (for multi-user farm access)
CREATE TABLE farm_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    role TEXT DEFAULT 'member', -- 'owner', 'member', 'viewer'
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(farm_id, user_id)
);

-- Sectors within farms
CREATE TABLE sectors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    area_hectares REAL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id)
);

-- Animals table
CREATE TABLE animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    sector_id INTEGER,
    tag TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    sex TEXT,
    birth_date DATE,
    status TEXT DEFAULT 'active', -- 'active', 'sold', 'deceased'
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (sector_id) REFERENCES sectors(id)
);

-- Fields table
CREATE TABLE fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    area_hectares REAL,
    crop_type TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id)
);

-- Tasks table
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    due_date DATE,
    assigned_to TEXT, -- user_id
    created_by TEXT NOT NULL, -- user_id
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Inventory table
CREATE TABLE inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity REAL DEFAULT 0,
    unit TEXT DEFAULT 'units',
    min_stock_level REAL DEFAULT 10,
    current_stock_level REAL DEFAULT 0,
    location TEXT,
    expiry_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id)
);

-- Finance entries table
CREATE TABLE finance_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'income', 'expense'
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    category TEXT DEFAULT 'General',
    created_by TEXT NOT NULL, -- user_id
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Inventory transactions table
CREATE TABLE inventory_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inventory_item_id INTEGER NOT NULL,
    farm_id INTEGER NOT NULL,
    transaction_type TEXT NOT NULL, -- 'purchase', 'usage', 'adjustment', 'disposal'
    quantity_delta REAL NOT NULL, -- positive for additions, negative for reductions
    unit_cost REAL,
    reference_type TEXT, -- 'treatment', 'manual', 'purchase_order', etc.
    reference_id TEXT, -- ID of related record
    recorded_by TEXT NOT NULL, -- user_id
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inventory_item_id) REFERENCES inventory(id),
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (recorded_by) REFERENCES users(id)
);

-- Treatment records table
CREATE TABLE treatments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farm_id INTEGER NOT NULL,
    animal_id INTEGER,
    treatment_type TEXT NOT NULL,
    product_used TEXT,
    dosage TEXT,
    administered_by TEXT NOT NULL, -- user_id
    administered_at DATETIME NOT NULL,
    notes TEXT,
    follow_up_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    FOREIGN KEY (administered_by) REFERENCES users(id)
);

-- Audit log table
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    old_values TEXT, -- JSON string
    new_values TEXT, -- JSON string
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for better performance
CREATE INDEX idx_animals_farm_id ON animals(farm_id);
CREATE INDEX idx_animals_tag ON animals(tag);
CREATE INDEX idx_animals_status ON animals(status);

CREATE INDEX idx_farms_user_id ON farms(user_id);

CREATE INDEX idx_farm_members_farm_id ON farm_members(farm_id);
CREATE INDEX idx_farm_members_user_id ON farm_members(user_id);

CREATE INDEX idx_fields_farm_id ON fields(farm_id);

CREATE INDEX idx_tasks_farm_id ON tasks(farm_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);

CREATE INDEX idx_inventory_farm_id ON inventory(farm_id);
CREATE INDEX idx_inventory_category ON inventory(category);
CREATE INDEX idx_inventory_expiry_date ON inventory(expiry_date);

CREATE INDEX idx_finance_entries_farm_id ON finance_entries(farm_id);
CREATE INDEX idx_finance_entries_type ON finance_entries(type);
CREATE INDEX idx_finance_entries_date ON finance_entries(date);
CREATE INDEX idx_finance_entries_category ON finance_entries(category);

CREATE INDEX idx_treatments_farm_id ON treatments(farm_id);
CREATE INDEX idx_treatments_animal_id ON treatments(animal_id);
CREATE INDEX idx_treatments_administered_at ON treatments(administered_at);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);