"use client";

import { useMemo, useState } from "react";

/**
 * Animals Page (Mock)
 *
 * All data below is MOCK and clearly labeled. Replace mock arrays and handlers
 * with Supabase queries, RLS-aware inserts, and IndexedDB sync logic later.
 *
 * Features included:
 * - Identifier, species, location (pen) selection
 * - Pen allocation (mock dropdown)
 * - Movement history (mock per-animal history with dates)
 * - Status tracking (Active / Inactive / Quarantined)
 * - Health tracking (health status, last treatment date, treatment log)
 * - Knowledge Base links per species (mock routes)
 * - Audit metadata (created_at shown)
 * - Clear "(Mock)" labels on UI and buttons
 *
 * Future integration points are signposted with TODO comments.
 */

/* ----------------------------- MOCK CONSTANTS ---------------------------- */
/* 🐓 MOCK DATA — replace with Supabase tables and queries later */
const MOCK_SPECIES = ["Chickens", "Goats", "Sheep", "Cattle"];
const MOCK_LOCATIONS = ["Broiler Pen A", "Pasture Block 3", "Kraal 1", "Cattle Shed"];

/* ------------------------------- TYPES ---------------------------------- */
type Movement = { location: string; date: string; reason?: string };
type Treatment = { name: string; date: string; notes?: string };

type Animal = {
  id: number;
  identifier: string;
  species: string;
  location: string;
  status: "Active" | "Inactive" | "Quarantined";
  history: Movement[]; // movement history, newest last
  health: {
    healthStatus: "Healthy" | "Vaccinated" | "Needs Treatment" | "Under Observation";
    lastTreatment?: string; // ISO date string
    treatments: Treatment[]; // treatment history
  };
  created_at: string; // audit timestamp (ISO date)
};

/* ---------------------------- MOCK ENTRIES ------------------------------- */
/* 🐓 MOCK ENTRIES — sample animals for UI/testing only */
const MOCK_ANIMALS: Animal[] = [
  {
    id: 1,
    identifier: "CH-001",
    species: "Chickens",
    location: "Broiler Pen A",
    status: "Active",
    history: [
      { location: "Broiler Pen A", date: "2025-10-20", reason: "Initial placement" },
      { location: "Broiler Pen A", date: "2025-10-18", reason: "Moved for feed cycle" },
    ],
    health: {
      healthStatus: "Healthy",
      lastTreatment: "2025-10-18",
      treatments: [{ name: "ND Vaccine", date: "2025-10-18", notes: "Routine" }],
    },
    created_at: "2025-10-18T09:12:00Z",
  },
  {
    id: 2,
    identifier: "GT-002",
    species: "Goats",
    location: "Pasture Block 3",
    status: "Active",
    history: [{ location: "Pasture Block 3", date: "2025-10-19", reason: "Rotational grazing" }],
    health: {
      healthStatus: "Healthy",
      lastTreatment: "2025-10-10",
      treatments: [{ name: "Dewormer", date: "2025-10-10", notes: "Quarterly" }],
    },
    created_at: "2025-10-10T07:30:00Z",
  },
  {
    id: 3,
    identifier: "SH-003",
    species: "Sheep",
    location: "Kraal 1",
    status: "Active",
    history: [{ location: "Kraal 1", date: "2025-10-14", reason: "Weaning" }],
    health: {
      healthStatus: "Healthy",
      lastTreatment: "2025-10-14",
      treatments: [{ name: "Vaccination", date: "2025-10-14", notes: "Routine" }],
    },
    created_at: "2025-10-14T11:00:00Z",
  },
];

/* ---------------------------- COMPONENT --------------------------------- */
export default function AnimalsPage() {
  /* 🐓 MOCK STATE — initialised with MOCK_ANIMALS */
  const [animals, setAnimals] = useState<Animal[]>(MOCK_ANIMALS);

  /* Form state for adding or moving animals (mock only) */
  const [form, setForm] = useState({
    identifier: "",
    species: "",
    location: "",
  });

  /* Quick selectors for UI (derived from mock constants) */
  const speciesOptions = useMemo(() => MOCK_SPECIES, []);
  const locationOptions = useMemo(() => MOCK_LOCATIONS, []);

  /* ------------------------- MOCK ACTIONS -------------------------------- */
  /* Add new animal (mock): creates a new Animal in local state with audit fields */
  const addAnimalMock = () => {
    if (!form.identifier || !form.species || !form.location) {
      alert("Please complete Identifier, Species, and Location (Mock)");
      return;
    }

    const newId = animals.length ? Math.max(...animals.map((a) => a.id)) + 1 : 1;
    const todayIso = new Date().toISOString();
    const newAnimal: Animal = {
      id: newId,
      identifier: form.identifier,
      species: form.species,
      location: form.location,
      status: "Active",
      history: [{ location: form.location, date: todayIso.slice(0, 10), reason: "Initial mock creation" }],
      health: { healthStatus: "Healthy", lastTreatment: undefined, treatments: [] },
      created_at: todayIso,
    };

    setAnimals((s) => [...s, newAnimal]);
    setForm({ identifier: "", species: "", location: "" });
  };

  /* Move animal (mock): append movement to history and update current location */
  const moveAnimalMock = (animalId: number, toLocation: string, reason?: string) => {
    setAnimals((prev) =>
      prev.map((a) => {
        if (a.id !== animalId) return a;
        const today = new Date().toISOString().slice(0, 10);
        const updated: Animal = {
          ...a,
          location: toLocation,
          history: [...a.history, { location: toLocation, date: today, reason: reason ?? "Manual mock move" }],
        };
        return updated;
      })
    );
  };

  /* Record treatment (mock): append to treatments and update lastTreatment */
  const addTreatmentMock = (animalId: number, treatmentName: string, notes?: string) => {
    const date = new Date().toISOString().slice(0, 10);
    setAnimals((prev) =>
      prev.map((a) =>
        a.id === animalId
          ? {
              ...a,
              health: {
                ...a.health,
                healthStatus: "Vaccinated",
                lastTreatment: date,
                treatments: [...a.health.treatments, { name: treatmentName, date, notes }],
              },
            }
          : a
      )
    );
  };

  /* Toggle status (mock): Active <-> Quarantined (simple toggle for demo) */
  const toggleQuarantineMock = (animalId: number) => {
    setAnimals((prev) =>
      prev.map((a) =>
        a.id === animalId ? { ...a, status: a.status === "Quarantined" ? "Active" : "Quarantined" } : a
      )
    );
  };

  /* ----------------------------- RENDER ---------------------------------- */
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Animals</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* ---------- Add / Quick Actions (Mock) ---------- */}
        <section className="bg-white rounded border p-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-medium">Add Animal (Mock)</h2>
            <span className="text-xs text-gray-500">All data is Mock</span>
          </div>

          <label className="block">
            <span className="text-sm text-gray-700">Identifier</span>
            <input
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              placeholder="e.g. CH-004"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Species</span>
            <select
              value={form.species}
              onChange={(e) => setForm({ ...form, species: e.target.value })}
              className="mt-1 block w-full border rounded px-3 py-2"
            >
              <option value="">Select species</option>
              {speciesOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Location / Pen</span>
            <select
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="mt-1 block w-full border rounded px-3 py-2"
            >
              <option value="">Select location</option>
              {locationOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-2">
            <button
              onClick={addAnimalMock}
              className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
              aria-label="Add Animal (Mock)"
            >
              Add Animal (Mock)
            </button>

            {/* Quick demo helpers (mock) */}
            <button
              onClick={() => {
                // Demo: add sample test animal quickly
                const sampleId = `T-${Math.floor(Math.random() * 9000) + 1000}`;
                setForm({ identifier: sampleId, species: MOCK_SPECIES[0], location: MOCK_LOCATIONS[0] });
                setTimeout(addAnimalMock, 150);
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

        {/* ---------- Animal Records (Mock) ---------- */}
        <section className="bg-white rounded border p-4">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-lg font-medium">Animal Records (Mock)</h2>
            <span className="text-xs text-gray-500">Mock entries shown</span>
          </div>

          <ul className="divide-y">
            {animals.map((a) => (
              <li key={a.id} className="py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <strong className="text-sm">{a.identifier}</strong>
                      <span className="text-sm text-gray-700">{a.species}</span>
                      <span className="text-sm text-gray-500">in {a.location}</span>
                      <span className="text-xs text-gray-400">(Mock)</span>
                    </div>

                    <div className="mt-1 text-sm text-gray-600">
                      Status: <span className="font-medium">{a.status}</span>
                    </div>

                    <div className="mt-1 text-sm text-gray-600">
                      Health: <span className="font-medium">{a.health.healthStatus}</span>
                      {a.health.lastTreatment ? (
                        <> — Last treatment: {a.health.lastTreatment}</>
                      ) : null}
                    </div>

                    <div className="mt-2 text-xs text-blue-600">
                      {/* KB link is mock and routes to /kb/{species} for now */}
                      <a href={`/kb/${a.species.toLowerCase()}`} className="underline">
                        View {a.species} Care Guide
                      </a>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      Last moved:{" "}
                      {a.history.length ? `${a.history[a.history.length - 1].date} to ${a.history[a.history.length - 1].location}` : "—"}
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                      Created: {new Date(a.created_at).toLocaleString()} — Audit: Mock
                    </div>
                  </div>

                  {/* Actions (mock) */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => toggleQuarantineMock(a.id)}
                      className={`text-xs px-2 py-1 rounded border ${
                        a.status === "Quarantined" ? "bg-yellow-100" : "bg-white"
                      }`}
                    >
                      {a.status === "Quarantined" ? "Unquarantine (Mock)" : "Quarantine (Mock)"}
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const to = prompt("Move to which location? (mock)", MOCK_LOCATIONS[0]);
                          if (to) moveAnimalMock(a.id, to, "Manual mock move");
                        }}
                        className="text-xs px-2 py-1 rounded border"
                      >
                        Move (Mock)
                      </button>

                      <button
                        onClick={() => {
                          const treat = prompt("Treatment name (mock)", "Dewormer");
                          if (treat) {
                            addTreatmentMock(a.id, treat, "Recorded via mock UI");
                          }
                        }}
                        className="text-xs px-2 py-1 rounded border"
                      >
                        Treat (Mock)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Optional: show short movement & treatment history */}
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <div className="text-xs text-gray-600">
                    <div className="font-medium text-xs">Movement history (mock)</div>
                    <ul className="mt-1">
                      {a.history.slice(-5).map((m, idx) => (
                        <li key={idx}>
                          {m.date} — {m.location} {m.reason ? `(${m.reason})` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-gray-600">
                    <div className="font-medium text-xs">Treatment history (mock)</div>
                    <ul className="mt-1">
                      {a.health.treatments.length ? (
                        a.health.treatments.slice(-5).map((t, i) => (
                          <li key={i}>
                            {t.date} — {t.name} {t.notes ? `(${t.notes})` : ""}
                          </li>
                        ))
                      ) : (
                        <li>— none recorded</li>
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
          <li>Replace mock arrays with Supabase queries for species, locations, and animals.</li>
          <li>Add Supabase Auth + RLS policies for secure multi-role access.</li>
          <li>Implement IndexedDB queue (Dexie.js) for offline creation and sync to Supabase on reconnect.</li>
          <li>Store movement history and treatment history in dedicated DB tables with audit timestamps.</li>
          <li>Link KB article IDs to species/crop records and render full KB pages from kb_articles table.</li>
        </ul>
      </div>
    </div>
  );
}