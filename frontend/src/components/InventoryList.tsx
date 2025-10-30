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

interface InventoryListProps {
  farmId: string;
}

export function InventoryList({ farmId }: InventoryListProps) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInventory();
  }, [farmId]);

  const loadInventory = async () => {
    try {
      const response = await fetch(`/api/inventory/items?farm_id=${farmId}`, {
        headers: {
          'Authorization': `Bearer ${supabase.auth.getSession().then(({ data }) => data.session?.access_token)}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading inventory...</div>;
  }

  return (
    <div className="inventory-list">
      <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
                {item.sku && <p className="text-sm text-gray-500">SKU: {item.sku}</p>}
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  item.reorder_threshold && item.quantity_on_hand <= item.reorder_threshold
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}>
                  {item.quantity_on_hand} {item.unit}
                </p>
                {item.reorder_threshold && (
                  <p className="text-sm text-gray-500">
                    Threshold: {item.reorder_threshold}
                  </p>
                )}
              </div>
            </div>

            {item.supplier && (
              <p className="text-sm text-gray-600 mt-2">Supplier: {item.supplier}</p>
            )}

            {item.notes && (
              <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No inventory items found.
        </div>
      )}
    </div>
  );
}