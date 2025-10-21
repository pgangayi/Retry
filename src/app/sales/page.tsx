"use client";

import { useState } from "react";

/**
 * Basic Sales Module
 * Simple sales tracking and customer management
 */

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
};

type Sale = {
  id: number;
  customerId: number;
  customerName: string;
  items: string;
  amount: number;
  date: string;
  status: "Pending" | "Paid" | "Cancelled";
};

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    phone: "+263 71 234 5678",
    email: "john@example.com",
    location: "Harare"
  },
  {
    id: 2,
    name: "Mary Johnson",
    phone: "+263 73 987 6543",
    email: "mary@example.com",
    location: "Bulawayo"
  }
];

const MOCK_SALES: Sale[] = [
  {
    id: 1,
    customerId: 1,
    customerName: "John Smith",
    items: "Maize 50kg, Fertilizer 25kg",
    amount: 45000,
    date: "2025-10-20",
    status: "Paid"
  },
  {
    id: 2,
    customerId: 2,
    customerName: "Mary Johnson",
    items: "Chicken feed 100kg",
    amount: 25000,
    date: "2025-10-19",
    status: "Pending"
  }
];

export default function SalesPage() {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [sales, setSales] = useState<Sale[]>(MOCK_SALES);
  const [saleForm, setSaleForm] = useState({
    customerId: 0,
    items: "",
    amount: 0,
    status: "Pending" as Sale["status"]
  });

  const addSale = () => {
    if (!saleForm.customerId || !saleForm.items || !saleForm.amount) return;

    const customer = customers.find(c => c.id === saleForm.customerId);
    if (!customer) return;

    const newSale: Sale = {
      id: Math.max(...sales.map(s => s.id)) + 1,
      customerId: saleForm.customerId,
      customerName: customer.name,
      items: saleForm.items,
      amount: saleForm.amount,
      date: new Date().toISOString().slice(0, 10),
      status: saleForm.status
    };

    setSales([newSale, ...sales]);
    setSaleForm({
      customerId: 0,
      items: "",
      amount: 0,
      status: "Pending"
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Sales & Invoicing</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Add Sale Form */}
        <div className="bg-white rounded border p-4">
          <h2 className="text-lg font-medium mb-4">Record Sale</h2>

          <div className="space-y-3">
            <select
              value={saleForm.customerId}
              onChange={(e) => setSaleForm({...saleForm, customerId: parseInt(e.target.value)})}
              className="w-full border rounded px-3 py-2"
            >
              <option value={0}>Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.location}
                </option>
              ))}
            </select>

            <input
              placeholder="Items sold"
              value={saleForm.items}
              onChange={(e) => setSaleForm({...saleForm, items: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="number"
              placeholder="Amount (RTGS)"
              value={saleForm.amount || ""}
              onChange={(e) => setSaleForm({...saleForm, amount: parseInt(e.target.value) || 0})}
              className="w-full border rounded px-3 py-2"
            />

            <select
              value={saleForm.status}
              onChange={(e) => setSaleForm({...saleForm, status: e.target.value as Sale["status"]})}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={addSale}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Record Sale
            </button>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded border p-4">
          <h2 className="text-lg font-medium mb-4">Recent Sales</h2>

          <div className="space-y-3">
            {sales.map((sale) => (
              <div key={sale.id} className="border rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{sale.customerName}</h3>
                    <p className="text-sm text-gray-600">{sale.items}</p>
                    <p className="text-sm text-gray-600">Date: {sale.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${sale.amount.toLocaleString()}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      sale.status === "Paid" ? "bg-green-100 text-green-800" :
                      sale.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {sale.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="mt-6 bg-white rounded border p-4">
        <h2 className="text-lg font-medium mb-4">Customers</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer) => (
            <div key={customer.id} className="border rounded p-3">
              <h3 className="font-medium">{customer.name}</h3>
              <p className="text-sm text-gray-600">📞 {customer.phone}</p>
              <p className="text-sm text-gray-600">📧 {customer.email}</p>
              <p className="text-sm text-gray-600">📍 {customer.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}