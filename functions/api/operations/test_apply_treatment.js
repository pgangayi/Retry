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
    query: async (text, params) => {
      // very small SQL parser for our limited calls
      if (text.startsWith('SELECT id, qty FROM inventory_items')) {
        const id = params[0];
        const qty = state.inventory[id];
        if (typeof qty === 'undefined') return { rowCount: 0, rows: [] };
        return { rowCount: 1, rows: [{ id, qty }] };
      }
      if (text.startsWith('UPDATE inventory_items')) {
        const qty = params[0]; // amount to subtract
        const id = params[1];
        state.inventory[id] = (state.inventory[id] || 0) - qty;
        return { rowCount: 1 };
      }
      if (text.startsWith('INSERT INTO inventory_transactions')) {
        const id = `tx_${state.inventoryTransactions.length + 1}`;
        state.inventoryTransactions.push({ id, params });
        return { rows: [{ id }], rowCount: 1 };
      }
      if (text.startsWith('INSERT INTO treatments')) {
        const id = `t_${state.treatments.length + 1}`;
        state.treatments.push({ id, params });
        return { rows: [{ id }], rowCount: 1 };
      }
      return { rowCount: 0, rows: [] };
    },
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
