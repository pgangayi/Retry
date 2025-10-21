"use client";

import { useState } from "react";

/**
 * Basic Inventory Module
 * Simple equipment and supplies tracking
 */

type InventoryItem = {
  id: number;
  name: string;
  category: "Equipment" | "Supplies" | "Tools";
  quantity: number;
  unit: string;
  location: string;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  lastMaintenance?: string;
};

const MOCK_ITEMS: InventoryItem[] = [
  {
    id: 1,
    name: "John Deere Tractor",
    category: "Equipment",
    quantity: 1,
    unit: "unit",
    location: "Main Barn",
    condition: "Good",
    lastMaintenance: "2025-09-15"
  },
  {
    id: 2,
    name: "NPK Fertilizer",
    category: "Supplies",
    quantity: 500,
    unit: "kg",
    location: "Storage Shed",
    condition: "Excellent"
  },
  {
    id: 3,
    name: "Irrigation Pump",
    category: "Equipment",
    quantity: 2,
    unit: "units",
    location: "Field Station",
    condition: "Fair",
    lastMaintenance: "2025-08-20"
  }
];

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(MOCK_ITEMS);
  const [form, setForm] = useState({
    name: "",
    category: "Equipment" as InventoryItem["category"],
    quantity: 0,
    unit: "units",
    location: "",
    condition: "Good" as InventoryItem["condition"]
  });

  const addItem = () => {
    if (!form.name || !form.location) return;

    const newItem: InventoryItem = {
      id: Math.max(...items.map(i => i.id)) + 1,
      ...form
    };

    setItems([...items, newItem]);
    setForm({
      name: "",
      category: "Equipment",
      quantity: 0,
      unit: "units",
      location: "",
      condition: "Good"
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Inventory Management</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Add Item Form */}
        <div className="bg-white rounded border p-4">
          <h2 className="text-lg font-medium mb-4">Add Item</h2>

          <div className="space-y-3">
            <input
              placeholder="Item name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />

            <select
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value as InventoryItem["category"]})}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Equipment">Equipment</option>
              <option value="Supplies">Supplies</option>
              <option value="Tools">Tools</option>
            </select>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Quantity"
                value={form.quantity || ""}
                onChange={(e) => setForm({...form, quantity: parseInt(e.target.value) || 0})}
                className="border rounded px-3 py-2"
              />
              <input
                placeholder="Unit"
                value={form.unit}
                onChange={(e) => setForm({...form, unit: e.target.value})}
                className="border rounded px-3 py-2"
              />
            </div>

            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({...form, location: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />

            <select
              value={form.condition}
              onChange={(e) => setForm({...form, condition: e.target.value as InventoryItem["condition"]})}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>

            <button
              onClick={addItem}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded border p-4">
          <h2 className="text-lg font-medium mb-4">Current Inventory</h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="border rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.quantity} {item.unit} • {item.category}
                    </p>
                    <p className="text-sm text-gray-600">📍 {item.location}</p>
                    <p className="text-sm text-gray-600">Condition: {item.condition}</p>
                    {item.lastMaintenance && (
                      <p className="text-sm text-gray-600">
                        Last maintenance: {item.lastMaintenance}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}