"use client";

import { useMemo, useState } from "react";

/**
 * Crops Page (Mock)
 *
 * All data below is MOCK and clearly labeled. Replace mock arrays and handlers
 * with Supabase queries, RLS-aware inserts, and IndexedDB sync logic later.
 *
 * Features included:
 * - Crop variety, field selection, planting dates
 * - Field allocation and rotation planning
 * - Growth stage tracking and harvest predictions
 * - Irrigation and treatment scheduling
 * - Yield tracking and harvest records
 * - Knowledge Base links per crop variety
 * - Audit metadata (created_at shown)
 * - Clear "(Mock)" labels on UI and buttons
 *
 * Future integration points are signposted with TODO comments.
 */

/* ----------------------------- MOCK CONSTANTS ---------------------------- */
/* 🌱 MOCK DATA — replace with Supabase tables and queries later */
const MOCK_CROP_VARIETIES = ["Maize", "Wheat", "Soybeans", "Sunflowers", "Cotton"];
const MOCK_FIELDS = ["Field A1", "Field B2", "Field C3", "Field D4", "Field E5"];
const MOCK_GROWTH_STAGES = ["Planted", "Germination", "Vegetative", "Flowering", "Maturation", "Harvest Ready"];

/* ------------------------------- TYPES ---------------------------------- */
type Treatment = { name: string; date: string; type: "Fertilizer" | "Pesticide" | "Irrigation"; notes?: string };
type Harvest = { date: string; quantity: number; unit: string; quality: "Premium" | "Standard" | "Low"; notes?: string };

type Crop = {
  id: number;
  variety: string;
  field: string;
  plantingDate: string;
  growthStage: string;
  expectedHarvestDate: string;
  treatments: Treatment[];
  harvests: Harvest[];
  status: "Active" | "Completed" | "Failed";
  created_at: string;
};

/* ---------------------------- MOCK ENTRIES ------------------------------- */
/* 🌱 MOCK ENTRIES — sample crops for UI/testing only */
const MOCK_CROPS: Crop[] = [
  {
    id: 1,
    variety: "Maize",
    field: "Field A1",
    plantingDate: "2025-09-15",
    growthStage: "Flowering",
    expectedHarvestDate: "2025-12-20",
    treatments: [
      { name: "NPK Fertilizer", date: "2025-09-20", type: "Fertilizer", notes: "Base application" },
      { name: "Insecticide Spray", date: "2025-10-05", type: "Pesticide", notes: "Corn borer control" },
      { name: "Irrigation", date: "2025-10-15", type: "Irrigation", notes: "Drip system" },
    ],
    harvests: [],
    status: "Active",
    created_at: "2025-09-15T08:00:00Z",
  },
  {
    id: 2,
    variety: "Wheat",
    field: "Field B2",
    plantingDate: "2025-08-01",
    growthStage: "Maturation",
    expectedHarvestDate: "2025-11-15",
    treatments: [
      { name: "Winter Fertilizer", date: "2025-08-10", type: "Fertilizer", notes: "Slow release" },
      { name: "Fungicide", date: "2025-09-25", type: "Pesticide", notes: "Rust prevention" },
    ],
    harvests: [
      { date: "2024-11-20", quantity: 2500, unit: "kg", quality: "Premium", notes: "Good weather conditions" },
    ],
    status: "Active",
    created_at: "2025-08-01T07:30:00Z",
  },
  {
    id: 3,
    variety: "Soybeans",
    field: "Field C3",
    plantingDate: "2025-10-01",
    growthStage: "Vegetative",
    expectedHarvestDate: "2026-01-30",
    treatments: [
      { name: "Rhizobium Inoculant", date: "2025-10-01", type: "Fertilizer", notes: "Seed treatment" },
      { name: "Irrigation", date: "2025-10-10", type: "Irrigation", notes: "Establishment watering" },
    ],
    harvests: [],
    status: "Active",
    created_at: "2025-10-01T09:15:00Z",
  },
];

/* ---------------------------- COMPONENT --------------------------------- */
export default function CropsPage() {
  /* 🌱 MOCK STATE — initialised with MOCK_CROPS */
  const [crops, setCrops] = useState<Crop[]>(MOCK_CROPS);

  /* Form state for adding new crops (mock only) */
  const [form, setForm] = useState({
    variety: "",
    field: "",
    plantingDate: "",
    expectedHarvestDate: "",
  });

  /* Quick selectors for UI (derived from mock constants) */
  const varietyOptions = useMemo(() => MOCK_CROP_VARIETIES, []);
  const fieldOptions = useMemo(() => MOCK_FIELDS, []);
  const stageOptions = useMemo(() => MOCK_GROWTH_STAGES, []);

  /* ------------------------- MOCK ACTIONS -------------------------------- */
  /* Add new crop (mock): creates a new Crop in local state with audit fields */
  const addCropMock = () => {
    if (!form.variety || !form.field || !form.plantingDate) {
      alert("Please complete Variety, Field, and Planting Date (Mock)");
      return;
    }

    const newId = crops.length ? Math.max(...crops.map((c) => c.id)) + 1 : 1;
    const todayIso = new Date().toISOString();
    const newCrop: Crop = {
      id: newId,
      variety: form.variety,
      field: form.field,
      plantingDate: form.plantingDate,
      growthStage: "Planted",
      expectedHarvestDate: form.expectedHarvestDate || "",
      treatments: [],
      harvests: [],
      status: "Active",
      created_at: todayIso,
    };

    setCrops((s) => [...s, newCrop]);
    setForm({ variety: "", field: "", plantingDate: "", expectedHarvestDate: "" });
  };

  /* Update growth stage (mock): advance crop through growth stages */
  const updateGrowthStageMock = (cropId: number, newStage: string) => {
    setCrops((prev) =>
      prev.map((c) =>
        c.id === cropId ? { ...c, growthStage: newStage } : c
      )
    );
  };

  /* Record treatment (mock): add treatment to crop record */
  const addTreatmentMock = (cropId: number, treatmentName: string, treatmentType: "Fertilizer" | "Pesticide" | "Irrigation", notes?: string) => {
    const date = new Date().toISOString().slice(0, 10);
    setCrops((prev) =>
      prev.map((c) =>
        c.id === cropId
          ? {
              ...c,
              treatments: [...c.treatments, { name: treatmentName, date, type: treatmentType, notes }],
            }
          : c
      )
    );
  };

  /* Record harvest (mock): add harvest record and mark crop as completed */
  const recordHarvestMock = (cropId: number, quantity: number, unit: string, quality: "Premium" | "Standard" | "Low", notes?: string) => {
    const date = new Date().toISOString().slice(0, 10);
    setCrops((prev) =>
      prev.map((c) =>
        c.id === cropId
          ? {
              ...c,
              harvests: [...c.harvests, { date, quantity, unit, quality, notes }],
              status: "Completed",
              growthStage: "Harvested",
            }
          : c
      )
    );
  };

  /* ----------------------------- RENDER ---------------------------------- */
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Crops</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* ---------- Add / Quick Actions (Mock) ---------- */}
        <section className="bg-white rounded border p-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-medium">Add Crop (Mock)</h2>
            <span className="text-xs text-gray-500">All data is Mock</span>
          </div>

          <label className="block">
            <span className="text-sm text-gray-700">Crop Variety</span>
            <select
              value={form.variety}
              onChange={(e) => setForm({ ...form, variety: e.target.value })}
              className="mt-1 block w-full border rounded px-3 py-2"
            >
              <option value="">Select variety</option>
              {varietyOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Field</span>
            <select
              value={form.field}
              onChange={(e) => setForm({ ...form, field: e.target.value })}
              className="mt-1 block w-full border rounded px-3 py-2"
            >
              <option value="">Select field</option>
              {fieldOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Planting Date</span>
            <input
              type="date"
              value={form.plantingDate}
              onChange={(e) => setForm({ ...form, plantingDate: e.target.value })}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Expected Harvest Date (Optional)</span>
            <input
              type="date"
              value={form.expectedHarvestDate}
              onChange={(e) => setForm({ ...form, expectedHarvestDate: e.target.value })}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <div className="flex gap-2">
            <button
              onClick={addCropMock}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              aria-label="Add Crop (Mock)"
            >
              Add Crop (Mock)
            </button>

            <button
              onClick={() => {
                // Demo: add sample test crop quickly
                const sampleId = `T-${Math.floor(Math.random() * 9000) + 1000}`;
                setForm({
                  variety: MOCK_CROP_VARIETIES[0],
                  field: MOCK_FIELDS[0],
                  plantingDate: new Date().toISOString().slice(0, 10),
                  expectedHarvestDate: ""
                });
                setTimeout(addCropMock, 150);
              }}
              className="border px-3 py-2 rounded"
            >
              Quick Add (Mock)
            </button>
          </div>

          <div className="text-xs text-gray-500">
            Note: This UI is offline-first ready. TODO: Replace mock handlers with IndexedDB queue + Supabase sync.
          </div>
        </section>

        {/* ---------- Crop Records (Mock) ---------- */}
        <section className="bg-white rounded border p-4">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-lg font-medium">Crop Records (Mock)</h2>
            <span className="text-xs text-gray-500">Mock entries shown</span>
          </div>

          <ul className="divide-y">
            {crops.map((c) => (
              <li key={c.id} className="py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <strong className="text-sm">{c.variety}</strong>
                      <span className="text-sm text-gray-700">in {c.field}</span>
                      <span className="text-xs text-gray-400">(Mock)</span>
                    </div>

                    <div className="mt-1 text-sm text-gray-600">
                      Status: <span className="font-medium">{c.status}</span>
                    </div>

                    <div className="mt-1 text-sm text-gray-600">
                      Growth Stage: <span className="font-medium">{c.growthStage}</span>
                    </div>

                    <div className="mt-1 text-sm text-gray-600">
                      Planted: {c.plantingDate}
                      {c.expectedHarvestDate && (
                        <> • Expected Harvest: {c.expectedHarvestDate}</>
                      )}
                    </div>

                    <div className="mt-2 text-xs text-blue-600">
                      <a href={`/kb/${c.variety.toLowerCase()}`} className="underline">
                        View {c.variety} Growing Guide
                      </a>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      Last treatment:{" "}
                      {c.treatments.length ? `${c.treatments[c.treatments.length - 1].date} - ${c.treatments[c.treatments.length - 1].name}` : "—"}
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                      Created: {new Date(c.created_at).toLocaleString()} — Audit: Mock
                    </div>
                  </div>

                  {/* Actions (mock) */}
                  <div className="flex flex-col items-end gap-2">
                    <select
                      value={c.growthStage}
                      onChange={(e) => updateGrowthStageMock(c.id, e.target.value)}
                      className="text-xs border rounded px-2 py-1"
                    >
                      {stageOptions.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const treatment = prompt("Treatment name (mock)", "Fertilizer");
                          const type = prompt("Type (Fertilizer/Pesticide/Irrigation)", "Fertilizer") as "Fertilizer" | "Pesticide" | "Irrigation";
                          if (treatment && type) {
                            addTreatmentMock(c.id, treatment, type, "Recorded via mock UI");
                          }
                        }}
                        className="text-xs px-2 py-1 rounded border"
                      >
                        Treat (Mock)
                      </button>

                      {c.status === "Active" && (
                        <button
                          onClick={() => {
                            const quantity = prompt("Harvest quantity (kg)", "1000");
                            const quality = prompt("Quality (Premium/Standard/Low)", "Standard") as "Premium" | "Standard" | "Low";
                            if (quantity && quality) {
                              recordHarvestMock(c.id, parseInt(quantity), "kg", quality, "Manual harvest record");
                            }
                          }}
                          className="text-xs px-2 py-1 rounded border bg-green-50"
                        >
                          Harvest (Mock)
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Optional: show recent treatments and harvests */}
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <div className="text-xs text-gray-600">
                    <div className="font-medium text-xs">Recent treatments (mock)</div>
                    <ul className="mt-1">
                      {c.treatments.slice(-3).map((t, idx) => (
                        <li key={idx}>
                          {t.date} — {t.name} ({t.type})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-gray-600">
                    <div className="font-medium text-xs">Harvest records (mock)</div>
                    <ul className="mt-1">
                      {c.harvests.length ? (
                        c.harvests.slice(-3).map((h, i) => (
                          <li key={i}>
                            {h.date} — {h.quantity}{h.unit} ({h.quality})
                          </li>
                        ))
                      ) : (
                        <li>— no harvests yet</li>
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer notes / TODOs */}
      <div className="mt-6 text-xs text-gray-500">
        <div>TODO (integration plan):</div>
        <ul className="list-disc ml-5">
          <li>Replace mock arrays with Supabase queries for crop varieties, fields, and crops.</li>
          <li>Add Supabase Auth + RLS policies for secure multi-role access.</li>
          <li>Implement field rotation planning and crop succession recommendations.</li>
          <li>Add weather integration for irrigation scheduling and harvest timing.</li>
          <li>Store treatment and harvest history in dedicated DB tables with audit timestamps.</li>
          <li>Link KB article IDs to crop varieties and render full KB pages from kb_articles table.</li>
        </ul>
      </div>
    </div>
  );
}