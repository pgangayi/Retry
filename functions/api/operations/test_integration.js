require('dotenv').config();
const { createDbFromConnectionString } = require('./db_pg');
const { applyTreatment } = require('./apply-treatment');
const fs = require('fs');
const path = require('path');

async function runMigrations(db) {
  const migrationsDir = path.join(__dirname, '../../../migrations');
  const files = ['0001_enable_postgis.sql', '0002_core_inventory_finance.sql', '0003_operations_idempotency_and_rls.sql'];
  for (const f of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, f), 'utf8');
    console.log('Running migration', f);
    // For D1, we need to split and execute statements individually
    const statements = sql.split(';').filter(stmt => stmt.trim());
    for (const stmt of statements) {
      if (stmt.trim()) {
        await db.prepare(stmt.trim()).run();
      }
    }
  }
}

async function run() {
  // For D1 testing, we'll use a mock database since we can't easily connect to D1 from Node.js
  const db = {
    prepare: (sql) => ({
      bind: (...params) => ({
        run: async () => {
          // Mock implementation for testing
          if (sql.includes('INSERT INTO farms')) {
            return { meta: { last_row_id: 'farm_123' } };
          }
          if (sql.includes('INSERT INTO inventory_items')) {
            return { meta: { last_row_id: 'item_456' } };
          }
          return { success: true };
        },
        first: async () => {
          if (sql.includes('SELECT qty FROM inventory_items')) {
            return { qty: 6 }; // Mock remaining quantity after treatment
          }
          return null;
        },
        all: async () => ({ results: [] })
      })
    }),
    batch: (statements) => ({
      run: async () => {
        // Mock batch execution
        return statements.map(() => ({ meta: { last_row_id: 'treatment_789' } }));
      }
    })
  };

  try {
    // Skip migrations for D1 mock test

    // Seed a farm and inventory item (mocked)
    const farmId = 'farm_123';
    const itemId = 'item_456';

    // Prepare payload
    const payload = {
      farmId,
      targetType: 'livestock',
      targetId: 'dummy-animal',
      appliedAt: new Date().toISOString(),
      items: [{ inventoryItemId: itemId, qty: 4, unit: 'unit' }]
    };

    const res = await applyTreatment({ payload, deps: { db, userId: 'test-user' } });
    console.log('applyTreatment result:', res);
    if (res.status !== 200) throw new Error('applyTreatment failed: ' + JSON.stringify(res));

    console.log('Integration test passed (using D1 mock)');
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

run().catch(err => {
  console.error('Integration test failed:', err);
  process.exit(1);
});
