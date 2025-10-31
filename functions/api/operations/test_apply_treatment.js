const assert = require('assert');
const { applyTreatment } = require('./apply-treatment');

// A tiny mock DB client with transaction semantics for testing
function createMockDb({ inventory = {} } = {}) {
  let inTransaction = false;
  // shallow copy so tests can inspect changes
  const state = { inventory: { ...inventory }, inventoryTransactions: [], treatments: [] };

  return {
    begin: async () => { inTransaction = true; },
    commit: async () => { inTransaction = false; },
    rollback: async () => { inTransaction = false; },
    prepare: (sql) => ({
      bind: (...params) => ({
        run: async () => {
          // Mock D1-style execution
          if (sql.includes('UPDATE inventory_items')) {
            const qty = params[0];
            const id = params[1];
            state.inventory[id] = (state.inventory[id] || 0) - qty;
            return { success: true };
          }
          if (sql.includes('INSERT INTO inventory_transactions')) {
            const id = `tx_${state.inventoryTransactions.length + 1}`;
            state.inventoryTransactions.push({ id, params });
            return { meta: { last_row_id: id } };
          }
          if (sql.includes('INSERT INTO treatments')) {
            const id = `t_${state.treatments.length + 1}`;
            state.treatments.push({ id, params });
            return { meta: { last_row_id: id } };
          }
          return { success: true };
        },
        first: async () => {
          if (sql.includes('SELECT id, qty FROM inventory_items')) {
            const id = params[0];
            const qty = state.inventory[id];
            if (typeof qty === 'undefined') return null;
            return { id, qty };
          }
          return null;
        }
      })
    }),
    batch: (statements) => ({
      run: async () => {
        const results = [];
        for (const stmt of statements) {
          const result = await stmt.run();
          results.push(result);
        }
        return results;
      }
    }),
    _state: state
  };
}

async function testHappyPath() {
  const db = createMockDb({ inventory: { inv_1: 10 } });
  const payload = {
    farmId: 'farm_1',
    targetType: 'livestock',
    targetId: 'animal_1',
    appliedAt: new Date().toISOString(),
    items: [{ inventoryItemId: 'inv_1', qty: 3, unit: 'bottle' }]
  };
  const res = await applyTreatment({ payload, deps: { db, userId: 'user_1' } });
  assert.strictEqual(res.status, 200, 'Expected 200');
  assert.ok(res.body.treatmentId, 'treatmentId returned');
  assert.strictEqual(db._state.inventory['inv_1'], 7, 'inventory decremented');
  console.log('testHappyPath passed');
}

async function testInsufficientInventory() {
  const db = createMockDb({ inventory: { inv_2: 1 } });
  const payload = {
    farmId: 'farm_1',
    targetType: 'livestock',
    targetId: 'animal_1',
    appliedAt: new Date().toISOString(),
    items: [{ inventoryItemId: 'inv_2', qty: 5, unit: 'kg' }]
  };
  const res = await applyTreatment({ payload, deps: { db, userId: 'user_1' } });
  assert.strictEqual(res.status, 409, 'Expected 409 for insufficient inventory');
  assert.strictEqual(db._state.inventory['inv_2'], 1, 'inventory unchanged on conflict');
  console.log('testInsufficientInventory passed');
}

async function run() {
  await testHappyPath();
  await testInsufficientInventory();
  console.log('All tests passed');
}

run().catch(err => {
  console.error('Tests failed', err);
  process.exit(1);
});
