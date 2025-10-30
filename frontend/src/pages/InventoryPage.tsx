import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku?: string;
  unit: string;
  quantity_on_hand: number;
  reorder_threshold?: number;
  unit_cost?: number;
  supplier?: string;
  notes?: string;
}

export function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [farmId] = useState<string>('test-farm-id'); // This would come from context/route

  useEffect(() => {
    if (farmId) {
      loadInventory();
    }
  }, [farmId]);

  const loadInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .eq('farm_id', farmId);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Implement add, update, delete functions when UI is ready
  // const addItem = async (item: Omit<InventoryItem, 'id'>) => { ... }
  // const updateItem = async (id: string, updates: Partial<InventoryItem>) => { ... }
  // const deleteItem = async (id: string) => { ... }

  if (loading) {
    return <div className="p-6">Loading inventory...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button
          onClick={() => {/* Open add item modal */}}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">SKU</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Unit</th>
              <th className="px-4 py-2 text-left">Reorder Threshold</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.sku || '-'}</td>
                <td className={`px-4 py-2 ${
                  item.reorder_threshold && item.quantity_on_hand <= item.reorder_threshold
                    ? 'text-red-600 font-semibold'
                    : ''
                }`}>
                  {item.quantity_on_hand}
                </td>
                <td className="px-4 py-2">{item.unit}</td>
                <td className="px-4 py-2">{item.reorder_threshold || '-'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {/* Open edit modal */}}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {/* TODO: Implement delete */}}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No inventory items found. Add your first item to get started.
        </div>
      )}
    </div>
  );
}

export default InventoryPage;