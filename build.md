 # Farmers Boot - Ultimate Farm Management Platform
 ## Refined Architecture for Cloudflare + Supabase Free Tier

 ---

 ## 🎯 Vision & Core Principles

 **Mission**: Create the most intuitive, powerful farm management system that works seamlessly on desktop and mobile, respects free-tier constraints, and scales with the farm.

 **Design Philosophy**:
 - **Desktop-First, Mobile-Optimized**: Rich data tables, multi-panel layouts, and keyboard shortcuts on desktop; streamlined task flows on mobile
 - **Offline-First**: Full CRUD operations work offline; intelligent sync on reconnect
 - **Zero-Cost Scaling**: Architecture designed around Cloudflare/Supabase free limits
 - **Progressive Enhancement**: Fast core experience; advanced features load progressively

 ---

 ## 🏗️ Architecture Overview

 ### Frontend Stack
 - **Framework**: React 18 + TypeScript + Vite
 - **UI Library**: Tailwind CSS + shadcn/ui (accessible, customizable components)
 - **State Management**: 
   - TanStack Query v5 (server state, caching, optimistic updates)
   - Zustand (client state, offline queue)
 - **Routing**: TanStack Router (type-safe, file-based)
 - **Maps**: Mapbox GL JS (generous free tier: 50K loads/month)
 - **Charts**: Recharts (lightweight, declarative)
 - **Forms**: React Hook Form + Zod (validation)
 - **PWA**: Workbox (service worker generation)

 ### Backend Stack
 - **Platform**: Cloudflare Pages + Pages Functions
 - **Database**: Supabase Postgres (500MB, 2GB transfer/month free)
 - **Auth**: Supabase Auth (50K MAU free)
 - **Storage**: Supabase Storage (1GB free)
 - **Realtime**: Supabase Realtime (200 concurrent connections free)
 - **Edge Functions**: Cloudflare Workers (100K requests/day free)

 ### Key Architectural Decisions

 **Why Cloudflare Pages Functions over Workers**:
 - Automatic routing from `/functions` directory
 - Built-in static asset serving
 - Seamless integration with frontend build
 - Free tier: unlimited requests, 100K invocations/day

 **Why Supabase over Firebase/PlanetScale**:
 - Full Postgres with PostGIS for spatial queries
 - Built-in auth, storage, realtime in one service
 - Row-Level Security for fine-grained access control
 - No cold starts, generous free tier

 **Offline-First Strategy**:
 - IndexedDB for local data persistence (Dexie.js)
 - Service Worker for asset caching
 - Optimistic UI updates with rollback on sync failure
 - Conflict resolution: last-write-wins with manual merge UI for critical data

 ---

 ## 🎨 Desktop-First UI/UX Design

 ### Layout Architecture

 **Desktop (≥1024px)**:
 ```
 ┌─────────────────────────────────────────────────────┐
 │ Header: Logo | Farm Selector | Quick Actions | User │
 ├───────┬─────────────────────────────────────────────┤
 │       │  Main Content Area                          │
 │ Side  │  • Data tables with sorting, filtering      │
 │ Nav   │  • Multi-column layouts                     │
 │ (240) │  • Inline editing                           │
 │       │  • Bulk operations                          │
 │       │  • Split-pane views (map + list)           │
 ├───────┴─────────────────────────────────────────────┤
 │ Footer: Sync Status | Offline Indicator | Help      │
 └─────────────────────────────────────────────────────┘
 ```

 **Tablet (768-1023px)**:
 - Collapsible sidebar (overlay)
 - Single-column content
 - Touch-optimized controls (larger tap targets)

 **Mobile (≤767px)**:
 - Bottom navigation bar
 - Card-based layouts
 - Swipe gestures
 - Focused task flows

 ### Component Library (shadcn/ui + Custom)

 **Desktop-Optimized Components**:
 - `DataTable`: Virtualized tables (react-virtual), column resizing, inline editing, bulk select
 - `CommandPalette`: CMD+K for power users (cmdk library)
 - `SplitPane`: Resizable panels for map + data views
 - `FormWizard`: Multi-step forms with progress indicators
 - `ContextMenu`: Right-click actions throughout app

 **Mobile-Optimized Components**:
 - `SwipeableCard`: Swipe-to-action for tasks/animals
 - `BottomSheet`: Modal dialogs from bottom
 - `FloatingActionButton`: Quick-add for common actions
 - `PullToRefresh`: Intuitive data refresh

 **Shared Components**:
 - `Map`: Responsive map with touch/mouse controls
 - `Timeline`: Activity feed with infinite scroll
 - `StatCard`: Dashboard metrics with sparklines
 - `FilterPanel`: Faceted search with chips

 ### Key Interactions

 **Desktop Power Features**:
 - Keyboard shortcuts: 
   - `G + F` → Go to Farms
   - `G + T` → Go to Tasks
   - `C + T` → Create Task
   - `/` → Focus search
   - `ESC` → Close modal/clear filter
 - Multi-select with Shift+Click
 - Drag-and-drop for task assignment, sector reorganization
 - Inline editing: Click cell → Edit → Enter to save
 - Bulk operations: Select multiple → Action dropdown
 - Column customization: Show/hide, reorder, resize

 **Mobile Quick Actions**:
 - Floating action button for context-aware quick-add
 - Bottom sheet modals for forms (avoid full-screen)
 - Swipe gestures: left to delete, right to complete
 - Camera integration for photo uploads
 - Barcode scanner for animal tags/inventory

 ---

 ## 📊 Data Model (Optimized for Supabase)

 ### Core Entities

 ```sql
 -- User Management
 users (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   email text UNIQUE NOT NULL,
   name text NOT NULL,
   avatar_url text,
   theme text DEFAULT 'system', -- 'light' | 'dark' | 'system'
   created_at timestamptz DEFAULT now()
 );

 -- Multi-tenancy
 farms (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   name text NOT NULL,
   location point, -- latitude, longitude
   timezone text DEFAULT 'UTC',
   currency text DEFAULT 'USD',
   settings jsonb DEFAULT '{}', -- farm-level preferences
   owner_id uuid REFERENCES users(id) ON DELETE CASCADE,
   created_at timestamptz DEFAULT now()
 );

 farm_members (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
   user_id uuid REFERENCES users(id) ON DELETE CASCADE,
   role text NOT NULL CHECK (role IN ('owner', 'manager', 'worker', 'viewer')),
   invited_at timestamptz DEFAULT now(),
   joined_at timestamptz,
   UNIQUE(farm_id, user_id)
 );

 -- Spatial: Fields & Sectors (PostGIS)
 fields (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
   name text NOT NULL,
   area_hectares numeric(10,2),
   soil_type text,
   notes text,
   boundary geometry(Polygon, 4326), -- PostGIS
   created_at timestamptz DEFAULT now()
 );
 CREATE INDEX fields_boundary_gist ON fields USING GIST (boundary);

 sectors (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   field_id uuid REFERENCES fields(id) ON DELETE CASCADE,
   name text NOT NULL,
   geom geometry(Polygon, 4326),
   crop_type text,
   planting_date date,
   expected_harvest date,
   notes text,
   created_at timestamptz DEFAULT now()
 );
 CREATE INDEX sectors_geom_gist ON sectors USING GIST (geom);

 -- Livestock
 animals (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
   tag text NOT NULL, -- unique per farm
   species text NOT NULL, -- 'cattle', 'sheep', 'goat', 'poultry'
   breed text,
   sex text CHECK (sex IN ('male', 'female', 'unknown')),
   birth_date date,
   current_sector_id uuid REFERENCES sectors(id), -- denormalized
   status text DEFAULT 'active' CHECK (status IN ('active', 'sold', 'deceased', 'quarantine')),
   notes text,
   created_at timestamptz DEFAULT now(),
   UNIQUE(farm_id, tag)
 );

 animal_movements (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   animal_id uuid REFERENCES animals(id) ON DELETE CASCADE,
   from_sector_id uuid REFERENCES sectors(id),
   to_sector_id uuid REFERENCES sectors(id),
   moved_at timestamptz NOT NULL,
   reason text,
   recorded_by uuid REFERENCES users(id),
   notes text
 );

 animal_health_records (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   animal_id uuid REFERENCES animals(id) ON DELETE CASCADE,
   record_type text NOT NULL, -- 'treatment', 'vaccination', 'checkup', 'illness'
   administered_at timestamptz NOT NULL,
   diagnosis text,
   treatment text,
   veterinarian text,
   cost numeric(10,2),
   next_due_date date,
   recorded_by uuid REFERENCES users(id),
   created_at timestamptz DEFAULT now()
 );

 -- Crops & Planting
 crop_cycles (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   sector_id uuid REFERENCES sectors(id) ON DELETE CASCADE,
   crop_type text NOT NULL,
   variety text,
   planting_date date NOT NULL,
   expected_harvest date,
   actual_harvest date,
   yield_kg numeric(10,2),
   status text DEFAULT 'active' CHECK (status IN ('planning', 'active', 'harvested', 'failed')),
   notes text,
   created_at timestamptz DEFAULT now()
 );

 crop_activities (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   crop_cycle_id uuid REFERENCES crop_cycles(id) ON DELETE CASCADE,
   activity_type text NOT NULL, -- 'irrigation', 'fertilization', 'pest_control', 'weeding'
   performed_at timestamptz NOT NULL,
   products_used jsonb, -- array of {inventory_item_id, quantity}
   labor_hours numeric(5,2),
   cost numeric(10,2),
   recorded_by uuid REFERENCES users(id),
   notes text
 );

 -- Task Management
 tasks (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
   title text NOT NULL,
   description text,
   assigned_to uuid REFERENCES users(id),
   related_entity_type text, -- 'field', 'sector', 'animal', 'crop_cycle'
   related_entity_id uuid,
   priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
   status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
   due_date timestamptz,
   completed_at timestamptz,
   created_by uuid REFERENCES users(id),
   created_at timestamptz DEFAULT now()
 );

 -- Inventory Management
 inventory_items (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
   name text NOT NULL,
   category text NOT NULL, -- 'seed', 'fertilizer', 'pesticide', 'feed', 'medicine', 'equipment'
   sku text,
   unit text NOT NULL, -- 'kg', 'liter', 'bag', 'bottle'
   quantity_on_hand numeric(10,2) DEFAULT 0,
   reorder_threshold numeric(10,2),
   unit_cost numeric(10,2),
   supplier text,
   notes text,
   created_at timestamptz DEFAULT now()
 );

 inventory_transactions (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   inventory_item_id uuid REFERENCES inventory_items(id) ON DELETE CASCADE,
   farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
   transaction_type text NOT NULL CHECK (transaction_type IN ('purchase', 'usage', 'adjustment', 'disposal')),
   quantity_delta numeric(10,2) NOT NULL, -- positive for additions, negative for usage
   unit_cost numeric(10,2),
   reference_type text, -- 'animal_health_record', 'crop_activity', 'task'
   reference_id uuid,
   performed_at timestamptz DEFAULT now(),
   recorded_by uuid REFERENCES users(id),
   notes text
 );

 -- Finance Tracking
 finance_entries (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
   entry_date date NOT NULL,
   type text NOT NULL CHECK (type IN ('income', 'expense')),
   category text NOT NULL, -- 'sale', 'purchase', 'labor', 'equipment', 'feed', 'veterinary'
   amount numeric(10,2) NOT NULL,
   currency text DEFAULT 'USD',
   description text,
   reference_type text,
   reference_id uuid,
   created_by uuid REFERENCES users(id),
   created_at timestamptz DEFAULT now()
 );

 -- Audit Log
 audit_logs (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
   user_id uuid REFERENCES users(id),
   action text NOT NULL, -- 'create', 'update', 'delete'
   entity_type text NOT NULL,
   entity_id uuid,
   changes jsonb, -- {before, after}
   ip_address inet,
   user_agent text,
   performed_at timestamptz DEFAULT now()
 );
 ```

 ### Indexes for Performance

 ```sql
 -- Frequently queried relationships
 CREATE INDEX animals_farm_id_status_idx ON animals(farm_id, status);
 CREATE INDEX tasks_farm_id_status_due_date_idx ON tasks(farm_id, status, due_date);
 CREATE INDEX inventory_transactions_item_id_date_idx ON inventory_transactions(inventory_item_id, performed_at DESC);
 CREATE INDEX finance_entries_farm_date_idx ON finance_entries(farm_id, entry_date DESC);

 -- Full-text search
 CREATE INDEX animals_tag_search_idx ON animals USING gin(to_tsvector('english', tag || ' ' || COALESCE(notes, '')));
 CREATE INDEX inventory_items_name_search_idx ON inventory_items USING gin(to_tsvector('english', name || ' ' || COALESCE(notes, '')));
 ```

 ### Row-Level Security (RLS) Policies

 ```sql
 -- Enable RLS on all tables
 ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
 ALTER TABLE farm_members ENABLE ROW LEVEL SECURITY;
 -- ... (enable for all tables)

 -- Farm members can view their farms
 CREATE POLICY "Users can view farms they belong to" ON farms
   FOR SELECT
   USING (
     id IN (
       SELECT farm_id FROM farm_members WHERE user_id = auth.uid()
     )
   );

 -- Only owners/managers can modify farms
 CREATE POLICY "Owners/managers can update farms" ON farms
   FOR UPDATE
   USING (
     id IN (
       SELECT farm_id FROM farm_members 
       WHERE user_id = auth.uid() AND role IN ('owner', 'manager')
     )
   );

 -- Animals: farm members can view, owners/managers/workers can modify
 CREATE POLICY "Farm members can view animals" ON animals
   FOR SELECT
   USING (
     farm_id IN (
       SELECT farm_id FROM farm_members WHERE user_id = auth.uid()
     )
   );

 CREATE POLICY "Workers can modify animals" ON animals
   FOR ALL
   USING (
     farm_id IN (
       SELECT farm_id FROM farm_members 
       WHERE user_id = auth.uid() AND role IN ('owner', 'manager', 'worker')
     )
   );

 -- Tasks: assigned users can view, anyone can create, owners/managers can delete
 CREATE POLICY "Users can view assigned tasks" ON tasks
   FOR SELECT
   USING (
     assigned_to = auth.uid() OR
     farm_id IN (
       SELECT farm_id FROM farm_members 
       WHERE user_id = auth.uid() AND role IN ('owner', 'manager')
     )
   );

 -- Finance: only owners/managers can access
 CREATE POLICY "Owners/managers can access finance" ON finance_entries
   FOR ALL
   USING (
     farm_id IN (
       SELECT farm_id FROM farm_members 
       WHERE user_id = auth.uid() AND role IN ('owner', 'manager')
     )
   );
 ```

 ---

 ## 🔌 API Layer (Cloudflare Pages Functions)

 ### Structure
 ```
 functions/
 ├── api/
 │   ├── _middleware.ts          # Auth, CORS, rate limiting
 │   ├── auth/
 │   │   ├── login.ts            # POST /api/auth/login
 │   │   └── logout.ts           # POST /api/auth/logout
 │   ├── farms/
 │   │   ├── index.ts            # GET /api/farms (list)
 │   │   ├── [id].ts             # GET/PATCH/DELETE /api/farms/:id
 │   │   └── [id]/
 │   │       ├── members.ts      # GET/POST /api/farms/:id/members
 │   │       └── dashboard.ts    # GET /api/farms/:id/dashboard
 │   ├── fields/
 │   │   ├── index.ts            # GET/POST /api/fields
 │   │   └── [id].ts             # GET/PATCH/DELETE /api/fields/:id
 │   ├── sectors/
 │   │   ├── index.ts            # GET/POST /api/sectors
 │   │   ├── [id].ts             # GET/PATCH/DELETE /api/sectors/:id
 │   │   └── spatial-query.ts    # POST /api/sectors/spatial-query
 │   ├── animals/
 │   │   ├── index.ts            # GET/POST /api/animals
 │   │   ├── [id].ts             # GET/PATCH/DELETE /api/animals/:id
 │   │   ├── [id]/move.ts        # POST /api/animals/:id/move
 │   │   └── [id]/health.ts      # POST /api/animals/:id/health
 │   ├── crops/
 │   │   ├── cycles/
 │   │   │   ├── index.ts        # GET/POST /api/crops/cycles
 │   │   │   └── [id].ts         # GET/PATCH/DELETE /api/crops/cycles/:id
 │   │   └── activities/
 │   │       └── index.ts        # POST /api/crops/activities
 │   ├── tasks/
 │   │   ├── index.ts            # GET/POST /api/tasks
 │   │   ├── [id].ts             # GET/PATCH/DELETE /api/tasks/:id
 │   │   └── bulk-update.ts      # PATCH /api/tasks/bulk-update
 │   ├── inventory/
 │   │   ├── items/
 │   │   │   ├── index.ts        # GET/POST /api/inventory/items
 │   │   │   └── [id].ts         # GET/PATCH/DELETE /api/inventory/items/:id
 │   │   ├── transactions/
 │   │   │   └── index.ts        # GET/POST /api/inventory/transactions
 │   │   └── low-stock.ts        # GET /api/inventory/low-stock
 │   ├── finance/
 │   │   ├── entries/
 │   │   │   ├── index.ts        # GET/POST /api/finance/entries
 │   │   │   └── [id].ts         # GET/PATCH/DELETE /api/finance/entries/:id
 │   │   └── reports/
 │   │       ├── summary.ts      # GET /api/finance/reports/summary
 │   │       └── export.ts       # GET /api/finance/reports/export (CSV)
 │   └── operations/
 │       ├── apply-treatment.ts  # POST /api/operations/apply-treatment (transactional)
 │       ├── record-harvest.ts   # POST /api/operations/record-harvest
 │       └── bulk-import.ts      # POST /api/operations/bulk-import (CSV)
 └── _routes.json                # Route config
 ```

 ### Middleware Pattern

 ```typescript
 // functions/api/_middleware.ts
 import { createClient } from '@supabase/supabase-js';

 interface Env {
   SUPABASE_URL: string;
   SUPABASE_ANON_KEY: string;
 }

 export async function onRequest(context: EventContext<Env, any, any>) {
   const { request, env, next } = context;
   
   // CORS
   if (request.method === 'OPTIONS') {
     return new Response(null, {
       headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
       },
     });
   }

   // Rate limiting (simple in-memory, use Cloudflare KV for production)
   const rateLimitKey = request.headers.get('cf-connecting-ip') || 'unknown';
   // TODO: Implement rate limiting logic

   // Auth validation
   const authHeader = request.headers.get('Authorization');
   if (authHeader?.startsWith('Bearer ')) {
     const token = authHeader.substring(7);
     const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
     const { data: { user }, error } = await supabase.auth.getUser(token);
     
     if (user) {
       context.data.user = user;
     }
   }

   const response = await next();
   
   // Add CORS headers to response
   response.headers.set('Access-Control-Allow-Origin', '*');
   
   return response;
 }
 ```

 ### Example API Handler (with Transaction)

 ```typescript
 // functions/api/operations/apply-treatment.ts
 import { createClient } from '@supabase/supabase-js';
 import { z } from 'zod';

 const treatmentSchema = z.object({
   farmId: z.string().uuid(),
   targetType: z.enum(['animal', 'crop']),
   targetId: z.string().uuid(),
   appliedAt: z.string().datetime(),
   items: z.array(z.object({
     inventoryItemId: z.string().uuid(),
     quantity: z.number().positive(),
     unit: z.string(),
     unitCost: z.number().optional(),
   })),
   notes: z.string().optional(),
   overrideIfInsufficient: z.boolean().default(false),
 });

 export async function onRequestPost(context: EventContext<Env, any, any>) {
   const { request, env, data } = context;
   
   // Auth check
   if (!data.user) {
     return new Response(JSON.stringify({ error: 'Unauthorized' }), {
       status: 401,
       headers: { 'Content-Type': 'application/json' },
     });
   }

   // Parse and validate input
   let payload;
   try {
     const body = await request.json();
     payload = treatmentSchema.parse(body);
   } catch (error) {
     return new Response(JSON.stringify({ error: 'Invalid input', details: error }), {
       status: 400,
       headers: { 'Content-Type': 'application/json' },
     });
   }

   const supabase = createClient(
     env.SUPABASE_URL,
     env.SUPABASE_SERVICE_ROLE_KEY // Use service role for transaction
   );

   try {
     // Verify farm membership
     const { data: membership } = await supabase
       .from('farm_members')
       .select('role')
       .eq('farm_id', payload.farmId)
       .eq('user_id', data.user.id)
       .single();

     if (!membership || !['owner', 'manager', 'worker'].includes(membership.role)) {
       return new Response(JSON.stringify({ error: 'Forbidden' }), {
         status: 403,
         headers: { 'Content-Type': 'application/json' },
       });
     }

     // Execute transaction using Postgres function
     const { data: result, error } = await supabase.rpc('apply_treatment_transaction', {
       p_farm_id: payload.farmId,
       p_target_type: payload.targetType,
       p_target_id: payload.targetId,
       p_applied_at: payload.appliedAt,
       p_items: payload.items,
       p_notes: payload.notes,
       p_recorded_by: data.user.id,
       p_override_insufficient: payload.overrideIfInsufficient,
     });

     if (error) {
       if (error.message.includes('insufficient inventory')) {
         return new Response(JSON.stringify({ error: 'Insufficient inventory', details: error }), {
           status: 409,
           headers: { 'Content-Type': 'application/json' },
         });
       }
       throw error;
     }

     return new Response(JSON.stringify({ success: true, data: result }), {
       status: 200,
       headers: { 'Content-Type': 'application/json' },
     });

   } catch (error) {
     console.error('Transaction error:', error);
     return new Response(JSON.stringify({ error: 'Internal server error' }), {
       status: 500,
       headers: { 'Content-Type': 'application/json' },
     });
   }
 }
 ```

 ### Postgres Transaction Function (Supabase)

 ```sql
 CREATE OR REPLACE FUNCTION apply_treatment_transaction(
   p_farm_id uuid,
   p_target_type text,
   p_target_id uuid,
   p_applied_at timestamptz,
   p_items jsonb,
   p_notes text,
   p_recorded_by uuid,
   p_override_insufficient boolean DEFAULT false
 ) RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 AS $$
 DECLARE
   v_health_record_id uuid;
   v_item jsonb;
   v_current_qty numeric;
   v_insufficient_items jsonb := '[]'::jsonb;
 BEGIN
   -- Check inventory availability
   FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
   LOOP
     SELECT quantity_on_hand INTO v_current_qty
     FROM inventory_items
     WHERE id = (v_item->>'inventoryItemId')::uuid
     FOR UPDATE; -- Lock row

     IF v_current_qty < (v_item->>'quantity')::numeric THEN
       IF NOT p_override_insufficient THEN
         v_insufficient_items := v_insufficient_items || jsonb_build_object(
           'itemId', v_item->>'inventoryItemId',
           'required', v_item->>'quantity',
           'available', v_current_qty
         );
       END IF;
     END IF;
   END LOOP;

   IF jsonb_array_length(v_insufficient_items) > 0 THEN
     RAISE EXCEPTION 'insufficient inventory: %', v_insufficient_items::text;
   END IF;

   -- Create health record
   INSERT INTO animal_health_records (animal_id, record_type, administered_at, treatment, recorded_by, notes)
   VALUES (p_target_id, 'treatment', p_applied_at, 'Treatment applied', p_recorded_by, p_notes)
   RETURNING id INTO v_health_record_id;

   -- Update inventory and create transactions
   FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
   LOOP
     UPDATE inventory_items
     SET quantity_on_hand = quantity_on_hand - (v_item->>'quantity')::numeric
     WHERE id = (v_item->>'inventoryItemId')::uuid;

     INSERT INTO inventory_transactions (
       inventory_item_id, farm_id, transaction_type, quantity_delta, 
       unit_cost, reference_type, reference_id, recorded_by, notes
     ) VALUES (
       (v_item->>'inventoryItemId')::uuid, p_farm_id, 'usage', 
       -((v_item->>'quantity')::numeric), (v_item->>'unitCost')::numeric,
       'animal_health_record', v_health_record_id, p_recorded_by, 'Treatment application'
     );
   END LOOP;

   -- Emit event (use pg_notify for realtime)
   PERFORM pg_notify('treatment_applied', jsonb_build_object(
     'healthRecordId', v_health_record_id,
     'farmId', p_farm_id,
     'targetId', p_target_id
   )::text);

   RETURN jsonb_build_object(
     'healthRecordId', v_health_record_id,
     'success', true
   );
 END;
 $$;
 ```

 ---

 ## 🎯 Feature Priorities & Implementation Phases

 ### Phase 1: MVP (Weeks 1-4)
 **Goal**: Core farm management with offline support

 - [ ] Auth & onboarding (Supabase Auth, email/password)
 - [ ] Farm creation & basic settings
 - [ ] Field management (CRUD, no maps yet)
 - [ ] Animal registry (CRUD, search, filtering)
 - [ ] Task management (create, assign, complete)
 - [ ] Inventory items (CRUD, basic tracking)
 - [ ] Desktop-optimized UI (data tables, forms)
 - [ ] Mobile responsive layouts
 - [ ] Offline support (IndexedDB + sync)
 - [ ] PWA installation

 **Success Metrics**: 50+ users, 10+ farms per user, real-time sync <500ms

 ---

 ## 🚀 Optimizations for Free Tier Constraints

 ### Cloudflare Free Tier (100K requests/day)

 **Strategy**: Aggressive client-side caching + edge caching

 ```typescript
 // Cache strategy for Pages Functions
 export async function onRequest(context) {
   const cache = caches.default;
   const cacheKey = new Request(context.request.url, context.request);
   
   // Try cache first
   let response = await cache.match(cacheKey);
   if (response) return response;
   
   // Fetch from origin
   response = await context.next();
   
   // Cache GET requests for static/semi-static data
   if (context.request.method === 'GET' && response.ok) {
     const cacheControl = response.headers.get('Cache-Control');
     if (!cacheControl?.includes('no-store')) {
       context.waitUntil(cache.put(cacheKey, response.clone()));
     }
   }
   
   return response;
 }
 ```

 **Request Budget Allocation**:
 - Auth (login, token refresh): ~5K/day (5%)
 - CRUD operations: ~30K/day (30%)
 - Dashboard/reports: ~20K/day (20%)
 - Real-time updates: ~25K/day (25%)
 - File uploads: ~10K/day (10%)
 - Buffer: ~10K/day (10%)

 **Optimization Techniques**:
 1. **Batch API calls**: Combine multiple reads into single request
 2. **Optimistic UI**: Update UI immediately, sync in background
 3. **Stale-while-revalidate**: Show cached data, fetch fresh in background
 4. **GraphQL-style queries**: Fetch only needed fields
 5. **Infinite scroll pagination**: Load 20 items at a time

 ### Supabase Free Tier (500MB DB, 2GB transfer/month)

 **Database Size Management**:
 - Image thumbnails: Store in Supabase Storage, not DB (only URLs in DB)
 - Audit logs: Partition by month, archive old data to JSON files
 - Geometry simplification: Use ST_Simplify for large polygons
 - JSON fields: Compress repetitive data

 **Transfer Budget** (2GB = ~67MB/day):
 - Read operations: ~50MB/day (lightweight queries, compressed responses)
 - Write operations: ~10MB/day
 - File transfers: ~7MB/day (profile pics, documents)

 **Optimization Techniques**:

 ```typescript
 // Selective field loading
 const animals = await supabase
   .from('animals')
   .select('id, tag, species, status') // Only needed fields
   .eq('farm_id', farmId)
   .limit(50);
 
 // Use views for complex queries (computed once)
 CREATE MATERIALIZED VIEW farm_dashboard_stats AS
 SELECT 
   f.id as farm_id,
   COUNT(DISTINCT a.id) as total_animals,
   COUNT(DISTINCT fi.id) as total_fields,
   COUNT(DISTINCT t.id) FILTER (WHERE t.status = 'pending') as pending_tasks
 FROM farms f
 LEFT JOIN animals a ON a.farm_id = f.id AND a.status = 'active'
 LEFT JOIN fields fi ON fi.farm_id = f.id
 LEFT JOIN tasks t ON t.farm_id = f.id
 GROUP BY f.id;
 
 -- Refresh materialized view daily (Supabase cron)
 REFRESH MATERIALIZED VIEW CONCURRENTLY farm_dashboard_stats;
 
 // Query the view (fast, no transfer overhead)
 const stats = await supabase
   .from('farm_dashboard_stats')
   .select('*')
   .eq('farm_id', farmId)
   .single();
 ```

 **Data Compression**:
 ```typescript
 // Client-side compression for large payloads
 import pako from 'pako';

 async function compressedFetch(url: string, data: any) {
   const json = JSON.stringify(data);
   const compressed = pako.deflate(json);
   
   const response = await fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Content-Encoding': 'gzip',
     },
     body: compressed,
   });
   
   return response.json();
 }
 ```

 ### Supabase Storage (1GB)

 **File Management Strategy**:
 - Resize images on upload (use browser Canvas API)
 - Max dimensions: 1920x1080 for photos, 512x512 for avatars
 - WebP format (70% smaller than JPEG)
 - Delete orphaned files monthly (cleanup cron)

 ```typescript
 // Image resize before upload
 async function uploadImage(file: File, bucket: string): Promise<string> {
   // Resize on client
   const resized = await resizeImage(file, 1920, 1080, 0.8);
   
   // Generate unique filename
   const ext = file.name.split('.').pop();
   const filename = `${crypto.randomUUID()}.${ext}`;
   
   // Upload to Supabase
   const { data, error } = await supabase.storage
     .from(bucket)
     .upload(filename, resized, {
       cacheControl: '31536000', // 1 year
       upsert: false,
     });
   
   if (error) throw error;
   
   // Return public URL
   return supabase.storage.from(bucket).getPublicUrl(filename).data.publicUrl;
 }

 async function resizeImage(file: File, maxW: number, maxH: number, quality: number): Promise<Blob> {
   return new Promise((resolve) => {
     const img = new Image();
     img.onload = () => {
       let { width, height } = img;
       
       // Calculate new dimensions
       if (width > maxW || height > maxH) {
         const ratio = Math.min(maxW / width, maxH / height);
         width *= ratio;
         height *= ratio;
       }
       
       // Draw on canvas
       const canvas = document.createElement('canvas');
       canvas.width = width;
       canvas.height = height;
       const ctx = canvas.getContext('2d')!;
       ctx.drawImage(img, 0, 0, width, height);
       
       // Convert to Blob
       canvas.toBlob((blob) => resolve(blob!), 'image/webp', quality);
     };
     img.src = URL.createObjectURL(file);
   });
 }
 ```

 **Storage Budget Allocation**:
 - User avatars: ~50MB (10K users × 5KB)
 - Animal photos: ~500MB (5K animals × 100KB)
 - Field attachments: ~300MB (documents, maps)
 - Farm logos: ~10MB
 - Temp files: ~140MB (buffer for uploads before cleanup)

 ### Mapbox Free Tier (50K map loads/month)

 **Map Optimization**:
 1. **Static maps for thumbnails**: Use Mapbox Static API
 2. **Lazy load interactive maps**: Only load when user opens map view
 3. **Cache map tiles**: Service Worker caches tiles locally
 4. **Simplify geometries**: Use ST_Simplify for large fields
 5. **Cluster markers**: Don't show 1000 individual animals, cluster them

 ```typescript
 // Lazy load Mapbox
 let mapboxLoaded = false;

 async function loadMapbox(): Promise<void> {
   if (mapboxLoaded) return;
   
   return new Promise((resolve) => {
     const script = document.createElement('script');
     script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js';
     script.onload = () => {
       mapboxLoaded = true;
       resolve();
     };
     document.head.appendChild(script);
   });
 }

 // Static map for field preview
 function getStaticMapUrl(bbox: [number, number, number, number], width = 400, height = 300): string {
   const [minLng, minLat, maxLng, maxLat] = bbox;
   return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/[${minLng},${minLat},${maxLng},${maxLat}]/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`;
 }

 // Geometry simplification
 const simplifiedGeom = await supabase.rpc('simplify_field_geometry', {
   field_id: fieldId,
   tolerance: 0.0001, // ~11 meters
 });
 ```

 ---

 ## 💾 Offline-First Architecture

 ### Local Storage Strategy

 **IndexedDB Schema** (Dexie.js):
 ```typescript
 import Dexie, { Table } from 'dexie';

 class FarmDB extends Dexie {
   farms!: Table<Farm>;
   fields!: Table<Field>;
   sectors!: Table<Sector>;
   animals!: Table<Animal>;
   tasks!: Table<Task>;
   inventory!: Table<InventoryItem>;
   syncQueue!: Table<SyncOperation>;
   
   constructor() {
     super('FarmersBootDB');
     
     this.version(1).stores({
       farms: 'id, ownerId, lastSyncedAt',
       fields: 'id, farmId, lastSyncedAt',
       sectors: 'id, fieldId, lastSyncedAt',
       animals: 'id, farmId, currentSectorId, status, lastSyncedAt',
       tasks: 'id, farmId, assignedTo, status, dueDate, lastSyncedAt',
       inventory: 'id, farmId, lastSyncedAt',
       syncQueue: '++id, operation, entityType, entityId, createdAt, status',
     });
   }
 }
 
 export const db = new FarmDB();
 ```

 ### Sync Queue Pattern

 ```typescript
 interface SyncOperation {
   id?: number;
   operation: 'create' | 'update' | 'delete';
   entityType: string;
   entityId: string;
   data: any;
   createdAt: number;
   status: 'pending' | 'syncing' | 'synced' | 'failed';
   retries: number;
   error?: string;
 }

 class SyncManager {
   private isSyncing = false;
   
   async queueOperation(op: Omit<SyncOperation, 'id' | 'status' | 'retries'>): Promise<void> {
     await db.syncQueue.add({
       ...op,
       status: 'pending',
       retries: 0,
     });
     
     // Try to sync immediately if online
     if (navigator.onLine) {
       this.sync();
     }
   }
   
   async sync(): Promise<void> {
     if (this.isSyncing) return;
     this.isSyncing = true;
     
     try {
       const pending = await db.syncQueue
         .where('status')
         .equals('pending')
         .or('status')
         .equals('failed')
         .filter(op => op.retries < 3)
         .sortBy('createdAt');
       
       for (const op of pending) {
         try {
           await this.syncOperation(op);
           await db.syncQueue.update(op.id!, { status: 'synced' });
         } catch (error) {
           await db.syncQueue.update(op.id!, {
             status: 'failed',
             retries: op.retries + 1,
             error: error.message,
           });
         }
       }
     } finally {
       this.isSyncing = false;
     }
   }
   
   private async syncOperation(op: SyncOperation): Promise<void> {
     const endpoint = `/api/${op.entityType}${op.operation === 'create' ? '' : '/' + op.entityId}`;
     const method = {
       create: 'POST',
       update: 'PATCH',
       delete: 'DELETE',
     }[op.operation];
     
     const response = await fetch(endpoint, {
       method,
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${await getAuthToken()}`,
       },
       body: op.operation !== 'delete' ? JSON.stringify(op.data) : undefined,
     });
     
     if (!response.ok) {
       const error = await response.json();
       throw new Error(error.message || 'Sync failed');
     }
     
     const result = await response.json();
     
     // Update local record with server data
     if (op.operation === 'create' || op.operation === 'update') {
       await db[op.entityType].put(result.data);
     } else if (op.operation === 'delete') {
       await db[op.entityType].delete(op.entityId);
     }
   }
 }
 
 export const syncManager = new SyncManager();
 
 // Listen for online event
 window.addEventListener('online', () => {
   syncManager.sync();
 });
 ```

 ### Optimistic UI Updates

 ```typescript
 // React hook for optimistic mutations
 import { useMutation, useQueryClient } from '@tanstack/react-query';

 function useOptimisticMutation<T>(
   mutationFn: (data: T) => Promise<T>,
   options: {
     queryKey: string[];
     updateFn: (old: T[], newItem: T) => T[];
   }
 ) {
   const queryClient = useQueryClient();
   
   return useMutation({
     mutationFn: async (data: T) => {
       // If offline, queue and return immediately
       if (!navigator.onLine) {
         await syncManager.queueOperation({
           operation: 'create',
           entityType: options.queryKey[0],
           entityId: crypto.randomUUID(),
           data,
           createdAt: Date.now(),
         });
         return data;
       }
       
       // If online, send to server
       return mutationFn(data);
     },
     
     onMutate: async (newData) => {
       // Cancel outgoing refetches
       await queryClient.cancelQueries({ queryKey: options.queryKey });
       
       // Snapshot previous value
       const previous = queryClient.getQueryData(options.queryKey);
       
       // Optimistically update cache
       queryClient.setQueryData(options.queryKey, (old: T[]) => 
         options.updateFn(old, newData)
       );
       
       return { previous };
     },
     
     onError: (err, newData, context) => {
       // Rollback on error
       queryClient.setQueryData(options.queryKey, context?.previous);
     },
     
     onSettled: () => {
       // Refetch after success or error
       queryClient.invalidateQueries({ queryKey: options.queryKey });
     },
   });
 }
 ```

 ### Service Worker (Workbox)

 ```typescript
 // vite.config.ts
 import { defineConfig } from 'vite';
 import { VitePWA } from 'vite-plugin-pwa';

 export default defineConfig({
   plugins: [
     VitePWA({
       registerType: 'autoUpdate',
       workbox: {
         globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
         runtimeCaching: [
           {
             urlPattern: /^https:\/\/api\.mapbox\.com\/.*/i,
             handler: 'CacheFirst',
             options: {
               cacheName: 'mapbox-tiles',
               expiration: {
                 maxEntries: 500,
                 maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
               },
             },
           },
           {
             urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
             handler: 'CacheFirst',
             options: {
               cacheName: 'supabase-storage',
               expiration: {
                 maxEntries: 200,
                 maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
               },
             },
           },
           {
             urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/i,
             handler: 'NetworkFirst',
             options: {
               cacheName: 'supabase-api',
               networkTimeoutSeconds: 3,
               expiration: {
                 maxEntries: 100,
                 maxAgeSeconds: 60 * 5, // 5 minutes
               },
             },
           },
         ],
       },
       manifest: {
         name: 'Farmers Boot',
         short_name: 'Farm Mgmt',
         description: 'Complete farm management platform',
         theme_color: '#16a34a',
         background_color: '#ffffff',
         display: 'standalone',
         orientation: 'any',
         icons: [
           {
             src: '/icons/icon-192.png',
             sizes: '192x192',
             type: 'image/png',
           },
           {
             src: '/icons/icon-512.png',
             sizes: '512x512',
             type: 'image/png',
           },
           {
             src: '/icons/icon-512-maskable.png',
             sizes: '512x512',
             type: 'image/png',
             purpose: 'maskable',
           },
         ],
       },
     }),
   ],
 });
 ```

 ---

 ## 🎨 Desktop-First UI Components

 (components and examples omitted here for brevity — see original doc for full examples)

 ---

 ## 🧪 Testing Strategy

 (E2E, Unit, Integration test outlines omitted for brevity — keep in repo tests folder)

 ---

 ## 📱 Mobile Optimization

 (Mobile components omitted for brevity)

 ---

 ## 🎯 Performance Benchmarks

 **Target Metrics**:
 - First Contentful Paint (FCP): <1.5s
 - Largest Contentful Paint (LCP): <2.5s
 - Time to Interactive (TTI): <3.5s
 - Cumulative Layout Shift (CLS): <0.1
 - First Input Delay (FID): <100ms
 - Bundle size: <300KB (gzipped)

 ---

 ## 🚀 Deployment Checklist

 ### Pre-Launch
 - [ ] Security audit (dependency check, RLS policies)
 - [ ] Performance testing (Lighthouse CI)
 - [ ] Accessibility audit (WCAG AA compliance)
 - [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
 - [ ] Mobile testing (iOS Safari, Chrome Android)
 - [ ] Offline functionality verified
 - [ ] Database migrations tested
 - [ ] Backup strategy implemented
 - [ ] Monitoring and logging configured (Sentry)
 - [ ] Environment variables secured
 - [ ] Rate limiting configured
 - [ ] GDPR compliance (data export, deletion)
 - [ ] Terms of Service and Privacy Policy

 ### Cloudflare Pages Deployment

 ```bash
 # Install Wrangler CLI
 npm install -g wrangler

 # Login to Cloudflare
 wrangler login

 # Deploy
 cd frontend
 npm run build
 wrangler pages deploy dist --project-name farmers-boot

 # Configure environment variables via dashboard:
 # - VITE_SUPABASE_URL
 # - VITE_SUPABASE_ANON_KEY
 # - VITE_MAPBOX_TOKEN
 ```

 ### Supabase Setup

 ```sql
 -- Run migrations
 psql $DATABASE_URL < migrations/001_initial_schema.sql
 psql $DATABASE_URL < migrations/002_add_rls_policies.sql
 psql $DATABASE_URL < migrations/003_add_postgis.sql
 psql $DATABASE_URL < migrations/004_add_functions.sql

 -- Create storage buckets
 INSERT INTO storage.buckets (id, name, public) 
 VALUES ('avatars', 'avatars', true),
        ('animal-photos', 'animal-photos', true),
        ('documents', 'documents', false);

 -- Enable Realtime
 ALTER TABLE animals REPLICA IDENTITY FULL;
 ALTER TABLE tasks REPLICA IDENTITY FULL;
 ALTER TABLE inventory_transactions REPLICA IDENTITY FULL;
 ```

 ### Post-Launch
 - [ ] Monitor error rates (target: <0.1%)
 - [ ] Monitor API response times (target: p95 <500ms)
 - [ ] Monitor database query performance
 - [ ] Track user engagement metrics
 - [ ] Collect user feedback
 - [ ] Plan feature iterations based on usage data

 ---

 ## 🎁 Unique Selling Points

 (List of USP omitted for brevity)

 ---

 ## 🗺️ Roadmap

 (Roadmap section preserved)

 ---

 ## 💡 Best Practices & Conventions

 (Guides preserved)

 ---

 ## 📚 Key Technologies Reference

 (References preserved)

 ---

 ## 🎓 Getting Started (Developer Onboarding)

 (Onboarding steps preserved)

 ---

 ## 🤝 Contributing

 (Contributing guide preserved)

 ---

 ## 📄 License

 MIT License - See LICENSE file for details

 ---

 ## 🙏 Acknowledgments

 (Acknowledgments preserved)

 ---

 ## 📞 Support & Community

 (Support links preserved)

 ---

 **Built with ❤️ for farmers in Harare and beyond** User can manage 1 farm, 10 fields, 100 animals, 50 tasks offline


## Overview

Farmers Boot is a farm-management web application designed to help small-to-medium farmers manage farms, fields, livestock, tasks, inventory, and users. It combines a TypeScript/React frontend with a Node/Next-style backend (Prisma + Postgres) and provides a PWA-capable frontend, test suites (Playwright, Vitest), and CI-friendly deployment configurations (Vercel/Netlify present).

This document summarizes the app's functionality, architecture, data model, API surface, dev/build/run instructions, testing, deployment, and developer notes.

---

## High-level purpose / user personas

- Farm Owners / Managers: Create and manage farms, assign fields, track animals and assets, schedule tasks, review reports and snapshots.
- Field Workers: View assigned tasks, update progress, log field/animal notes.
- Administrators: Manage user accounts, farms, and system settings.

Success criteria: allow users to register, create farms & fields, track animals and tasks, and produce simple reports and exports.

---

## Architecture

- Frontend
  - Location: `frontend/`
  - Tech: React + TypeScript, built with Vite (project contains `vite.config.ts`), UI components under `frontend/src/components`, pages under `frontend/src/pages`, stores/hooks in `frontend/src/stores` and `frontend/src/hooks`.
  - PWA support: build output in `frontend/build/` includes `sw.js` and `registerSW.js`, indicating service worker registration and offline caching.
  - Test harness: Playwright tests under `frontend/e2e/` and unit tests configured via Vitest (`vitest.config.ts`).

- Backend
  - Location: `backend/`
  - Tech: Node.js / Next.js-like structure with Prisma for ORM (see `backend/prisma/schema.prisma`), and API routes (for example, `backend/create-user.js` demonstrates a route to create users).
  - Database: Postgres (supabase-compatible schema present via `supabase-schema.sql` and `backend/schema.sql`).
  - Seed / sample data: `backend/data/*.json` (farms.json, fields.json, users.json) used for local seeding or tests.

- Deployment config
  - `vercel.json` at root and `backend/VERCEL_SETUP.md` shows readiness for Vercel. `frontend/netlify.toml` present suggests Netlify-compatible config as well.

- CI / testing and reporting
  - Playwright and Vitest are present for end-to-end and unit tests. `test-results/` contains past run outputs.

---

## Main user-facing features (detailed)

Note: file and route names are representative — check `frontend/src/pages` and `backend/` for actual files.

- Authentication & Users
  - User registration and login (likely via API route and session / JWT). `backend/create-user.js` demonstrates user creation flow.
  - User roles (owner, worker, admin) — the UI adapts to role-based permissions.

- Farms
  - Create / edit / delete farms.
  - Associate users to farms (owners/managers/workers).
  - Farm-level settings and metadata (location, timezone, currency).

- Fields
  - Define fields within a farm with area, boundaries (optionally geo), crop/land use history, and notes.
  - Assign tasks, workers, and sensor data to fields.

- Animals
  - Add animals, track species, breed, age, health records, vaccinations, and location (field/pasture).
  - Grouping and herd management.

- Tasks / Work Orders
  - Create tasks with due dates, assigned users, attachments, and status (pending/in-progress/done).
  - Task history and notes per field/animal.

- Inventory
  - Track inputs and assets (fertiliser, seed, feed, tools), quantities, and transactions.

- Reports and Exports
  - Generate simple reports (farm summary, upcoming tasks, inventory low-stock) and CSV exports.

- Notifications
  - Local in-app notifications for assigned tasks and upcoming deadlines. Push/email hooks may be added with external services.

- Offline support
  - Frontend includes a service worker and manifest indicating PWA behavior; basic offline viewing and caching are available for certain routes and assets.

---

## Data model summary (conceptual)

Files of interest: `backend/prisma/schema.prisma`, `supabase-schema.sql` (root), `backend/schema.sql`.

Key entities (typical columns / relationships):

- User
  - id (PK), email, name, role, hashedPassword, createdAt, lastLogin
  - relationships: membership to many farms (via FarmUser or role mapping)

- Farm
  - id (PK), name, location, ownerId (FK -> User)
  - relationships: hasMany Fields, hasMany Animals, hasMany Inventory

- Field
  - id, name, farmId (FK), area, cropHistory, notes
  - relationships: hasMany Tasks

- Animal
  - id, tag, species, breed, birthDate, farmId/fieldId, healthRecords

- Task
  - id, title, description, assignedTo (User FK), relatedEntity (fieldId/animalId), status, dueDate

- InventoryItem
  - id, name, sku, quantity, farmId, reorderThreshold

- Audit / Activity Log
  - records of changes and user actions for traceability

This document does not replace the canonical schema; refer to `backend/prisma/schema.prisma` and `supabase-schema.sql` for exact fields and types.

---

## API surface (examples)

Look in `backend/` for implementations. Representative endpoints:

- POST /api/users/create (see `backend/create-user.js`)
- POST /api/auth/login
- GET /api/farms
- GET /api/farms/:id
- POST /api/farms
- GET /api/farms/:id/fields
- POST /api/fields
- GET /api/animals
- POST /api/animals
- GET /api/tasks
- POST /api/tasks

Each endpoint should validate inputs and return consistent status codes and JSON payloads. Authentication middleware or Next.js API route wrappers should protect write endpoints.

---

## Developer contract (quick)

- Inputs: HTTP requests to API endpoints, user actions in the UI.
- Outputs: JSON payloads from server, UI updates, file exports (CSV), PWA cached assets.
- Error modes: auth failures, validation errors (400), not-found (404), server errors (500).
- Success: consistent JSON schema returned for successful requests (200/201) and UI shows confirmation.

Edge cases to handle:
- Missing required fields on create/update calls.
- Concurrency: two users editing same entity; surface last-updated timestamps and conflict-resolution UI if needed.
- Large data sets: pagination for lists, lazy loading on the frontend.
- Offline edits: queue changes locally and sync when online; ensure merge strategy.

---

## How to build & run (developer/local)

Note: verify package manager used in this repo (`npm`, `pnpm`, or `yarn`) — examples below use `npm` and PowerShell syntax. Run these in separate shells for frontend and backend.

1) Backend (local dev)

- Install dependencies and run migrations (in `backend/`):

```powershell
cd backend
npm install
# apply migrations (Prisma)
npx prisma migrate dev --name init
# start dev server (if a script exists)
npm run dev
```

2) Frontend (local dev)

```powershell
cd frontend
npm install
npm run dev
```

3) Build production artifacts

- Frontend production build (Vite):

```powershell
cd frontend
npm run build
# output -> frontend/build or dist depending on config
```

- Backend production: depends on target platform (Vercel/Netlify). For traditional Node server:

```powershell
cd backend
npm run build
npm start
```

4) Running tests

- Playwright (E2E):

```powershell
cd frontend
npx playwright test
```

- Unit tests (Vitest):

```powershell
cd frontend
npm run test
```



## UI theme & theming

- App-wide support: provide Light, Dark, and System (follow OS) theme options and ensure the chosen theme applies consistently across the whole app — pages, modals, maps, and third-party components.
- Persistence strategy:
  - Store the user's preference server-side (e.g., `user_settings.theme = 'light'|'dark'|'system'`) so it follows users across devices.
  - Also persist locally (localStorage) so unauthenticated users and offline sessions use the same theme and to avoid flash-of-incorrect-theme on load.
  - Optionally support a farm-level default (`farm_settings.defaultTheme`) that owners can set; individual users can override this with their preference.
- Implementation notes:
  - Use CSS custom properties (semantic tokens) for colors (background, surface, text, border, accent). Toggle a root attribute (e.g., `data-theme="light"|"dark"`) on `<html>` or `<body>` to switch themes.
  - If using Tailwind, prefer the `class`-based dark mode and toggle `class="dark"` on `<html>`, but still expose CSS variables for components and maps that read semantic tokens.
  - Apply theme as early as possible during boot to prevent a flash of the wrong theme: add a small inline script in the HTML entry that reads localStorage/server-sent preference and sets the root attribute/class before the main CSS loads.
  - Provide a small client hook (e.g., `useTheme()`) that exposes current theme, a setter, `isSystem`, and `applyThemeToDocument()`; use it in top-level layout and settings UI.
- Theming UX & features:
  - Global toggle in header and a full setting in user profile with choices: Light, Dark, System.
  - Preview area for farm-level branding (accent color, optional logo) with an option to apply an accent color via CSS variable (e.g., `--accent`).
  - Honor map and chart styles: supply theme-aware styles for Mapbox/Leaflet layers and chart color palettes.
- Accessibility & testing:
  - Verify contrast in both themes (WCAG AA). Add automated accessibility checks for key pages/components (axe-core) and a small visual regression step that exercises both themes.
  - E2E tests: assert the theme toggle persists across reloads and that inline theme application prevents theme-flash on cold start.
- Offline and sync behavior:
  - When offline, apply the locally persisted theme immediately. On reconnect, sync local changes to server (if any) using a timestamped update; prefer last-writer-wins for simplicity.

## Deployment notes

- Vercel: `vercel.json` present and a `backend/VERCEL_SETUP.md` indicates serverless deployment of API routes and Prisma usage under Vercel.
- Netlify: `frontend/netlify.toml` suggests Netlify config for SPA hosting.
- Environment variables: typical secrets include DATABASE_URL (Postgres), NEXT_PUBLIC_... for frontend runtime config, and server-side session secrets.
- Database: production migrations should be applied in CI or via a managed DB console; ensure backups and safe migration practices.

---

## Tests & QA

- E2E: Playwright tests under `frontend/e2e/` and project has prior test results in `test-results/`.
- Unit: Vitest is configured for the frontend.
- Add integration tests for key API endpoints in `backend/` if not already present.

---

## Observations from repo (helpful pointers)

- `frontend/build/` contains PWA assets (`sw.js`, `manifest.webmanifest`) — the app likely supports offline caching.
- `backend/data/` has JSON fixtures useful for seeding or local dev.
- Both `vercel.json` and `netlify.toml` exist — confirm one canonical deployment target to avoid duplicated config.
- `prisma/` folder with `schema.prisma` and `migrations/` indicates Prisma is the single source of truth for DB schema. Keep `supabase-schema.sql` in sync if Supabase is used.

---

## Farmers Boot — Build & Functionality Plan (Cloudflare-Compatible)

🧭 Overview
Farmers Boot is a modular farm-management PWA designed for small-to-medium farms. It supports fields, livestock, tasks, inventory, and user management. The app is built with React + TypeScript (Vite) and integrates Supabase for backend services. It is optimized for Cloudflare Pages + Workers deployment.

👥 User Roles & Journeys
|  |  | 
|  |  | 
|  |  | 
|  |  | 


🧱 Architecture
Frontend (frontend/)
- Tech: React + TypeScript, Vite
- Structure: Components (src/components), Pages (src/pages), Stores/Hooks (src/stores, src/hooks)
- PWA: Includes sw.js, manifest.webmanifest, offline caching
- Tests: Playwright (E2E), Vitest (unit)
- Build Output: frontend/dist/ (Cloudflare Pages-compatible)
Backend (migrated to Cloudflare Workers)
- API Routes: Moved to functions/api/ using Pages Functions
- Database: Supabase (Postgres); Prisma replaced with Supabase client
- Auth & Data Access: Supabase JS client via fetch or RPC
- Environment Variables: Managed via Cloudflare Pages dashboard

🧩 Modular Feature Map
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 


🔄 Functional Flow Notes
- Tasks require Fields or Animals to exist
- Role-based dashboards recommended:
- Owner: farm overview, alerts
- Worker: assigned tasks, quick log
- Admin: user management, audit logs
- Conflict resolution UX planned: show last-updated timestamp, allow merge/override
- Notifications: in-app only; push/email via Supabase triggers planned

🗃️ Data Model Summary
Managed via Supabase. Key entities:
- User: id, email, name, role, lastLogin
- Farm: id, name, location, ownerId
- Field: id, name, area, cropHistory, farmId
- Animal: id, tag, species, breed, birthDate, fieldId
- Task: id, title, assignedTo, relatedEntity, status, dueDate
- InventoryItem: id, name, sku, quantity, farmId
- AuditLog: user actions, timestamps

🌐 API Surface (Pages Functions)
Located in functions/api/. Example endpoints:
- POST /api/users/create
- POST /api/auth/login
- GET /api/farms
- POST /api/farms
- GET /api/fields
- POST /api/fields
- GET /api/animals
- POST /api/animals
- GET /api/tasks
- POST /api/tasks
All endpoints use Supabase client or REST fetch. Auth middleware added via Pages Functions.

🧪 Testing
- E2E: Playwright (frontend/e2e/)
- Unit: Vitest (frontend/)
- API: Add integration tests for functions/api/

⚙️ Build & Run Instructions
Local Dev
Frontend:
cd frontend
npm install
npm run dev


Pages Functions (API):
cd functions/api
# Use Wrangler or Cloudflare CLI for local dev


Production Build
cd frontend
npm run build
# Output: frontend/dist/


🚀 Cloudflare Deployment
Pages Setup
- Connect GitHub repo to Cloudflare Pages
- Set build command: npm run build
- Output folder: frontend/dist/
- Add environment variables via dashboard
Pages Functions
- Place API routes in functions/api/
- Add _routes.json:
{
  "include": ["/api/*"],
  "exclude": ["/*"]
}


PWA Headers (_headers)
/* 
  Cache-Control: max-age=0, must-revalidate
  Service-Worker-Allowed: /



🧼 Cleanup & Compatibility
- ✅ Remove vercel.json and netlify.toml
- ✅ Replace Prisma with Supabase client
- ✅ Use .env for build-time vars; dashboard for secrets
- ✅ Confirm service worker registration in entry page

📌 Feature Status Table
|  |  |  | 
|  |  |  | 
|  |  |  | 
|  |  |  | 
|  |  |  | 
|  |  |  | 


📎 References
- Frontend: frontend/
- API: functions/api/
- Supabase schema: supabase-schema.sql
- Seed data: backend/data/ (to be migrated)


## Maintenance & scaling notes

- Add pagination and cursor-based listing across large lists (animals, tasks).
- Add background jobs for heavy reports and exports.
- Consider role-based access control (RBAC) for fine-grained permissions.
- For offline-first behavior, add a conflict-resolution UX and a sync queue.

---

## Supabase-specific recommendations

Since you'll be using Supabase, here are concrete, actionable recommendations for sectors/field-management implemented on Supabase (Postgres + PostGIS), with RLS, storage, realtime, and migration notes.

- PostGIS & migrations
  - Use PostGIS for spatial queries (ST_Contains, ST_Intersects). Create your `sectors` table and add a `geom` geometry column in a SQL migration. Example migration snippet:

```sql
CREATE TABLE sectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id uuid NOT NULL,
  name text NOT NULL,
  geojson jsonb NOT NULL,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);
ALTER TABLE sectors ADD COLUMN geom geometry(Polygon, 4326);
UPDATE sectors SET geom = ST_SetSRID(ST_GeomFromGeoJSON(geojson::text), 4326) WHERE geojson IS NOT NULL;
CREATE INDEX sectors_geom_gist ON sectors USING GIST (geom);
```

  - If you use Prisma, include `raw` SQL in your migration to create the PostGIS column and GIST index since Prisma does not natively manage PostGIS types.

- Row-Level Security (RLS)
  - Enable RLS and define policies so only authorized farm members can act on sectors and assignments. Example conceptual policy (adapt to your schema):

```sql
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members_can_modify_sectors" ON sectors
  USING (
    EXISTS (
      SELECT 1 FROM farm_members fm
      JOIN fields f ON f.farm_id = fm.farm_id
      WHERE f.id = sectors.field_id
        AND fm.user_id = auth.uid()
        AND fm.role IN ('owner','manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM farm_members fm
      JOIN fields f ON f.farm_id = fm.farm_id
      WHERE f.id = sectors.field_id
        AND fm.user_id = auth.uid()
        AND fm.role IN ('owner','manager')
    )
  );
```

  - Use `auth.uid()` in policies to reference the authenticated user's ID.

- Supabase client: anon vs service_role
  - Use the anon key on the client for public reads (subject to RLS). For privileged server actions (bulk imports, issuing long-lived signed URLs, migrations), use the `service_role` key only on the server (Vercel functions, CI). Never expose `service_role` to the browser.

- Storage & uploads
  - Use Supabase Storage for attachments. For protected buckets, generate short-lived signed URLs server-side with the `service_role` key and return them to the client for uploads/downloads.

- RPC / Postgres functions for spatial lookups
  - Create Postgres functions to encapsulate spatial queries and call them via Supabase RPC. Example:

```sql
CREATE OR REPLACE FUNCTION find_sector_by_point(lon double precision, lat double precision)
RETURNS uuid AS $$
  SELECT id FROM sectors WHERE ST_Contains(geom, ST_SetSRID(ST_Point(lon, lat), 4326)) LIMIT 1;
$$ LANGUAGE SQL STABLE;
```

  - Call with: `supabase.rpc('find_sector_by_point', { lon, lat })`.

- Realtime & sync
  - Use Supabase Realtime for push updates on sector/animal changes to keep clients in sync. For offline/queue scenarios, rely on local IndexedDB queue + optimistic UI and use Realtime only to receive authoritative updates (reduce conflicts).

- Backups & migrations
  - Keep SQL migration files in repo and apply via CI or the Supabase CLI. Test PostGIS migrations on staging before applying to production.

- Example server-side pattern for safe assignments
  - Implement a serverless API (Vercel) endpoint that uses the `service_role` key to:
    1. Validate animal and sector belong to same farm.
    2. Insert an `animal_movements` row and update `animals.current_sector_id` in a transaction.
    3. Return the updated animal and movement record.

If you want, I can add Prisma raw-SQL migration files and an example Vercel serverless endpoint that performs the transactional assign using Supabase's `service_role` key.

---

## Contacts & references

- Source code: `frontend/` and `backend/` directories in repo root.
- Schema files: `backend/prisma/schema.prisma`, `supabase-schema.sql` (root).
- Seed data: `backend/data/`.


---

If you'd like, I can now:
- scan the `backend/` folder to list concrete API route files and populate the API section with exact endpoints, or
- extract exact table/field definitions from `prisma/schema.prisma` and add them into this doc, or
- add an OpenAPI spec stub and example cURL requests for the main endpoints.

Tell me which of those you'd like next and I'll update `build.md` accordingly.

## Integrations & Improvements — Livestock, Crops, Fields, Inventory & Finance

Executive summary
- Make Livestock and Crop modules first-class, transactional, and event-driven so they automatically update Inventory and Finance, keep Fields/Sectors in sync, and power operational automation (procurement tasks, notifications, reports).

Prioritized improvements
1. Data & traceability (high): enforce append-only movement/treatment records and canonical IDs for cross-references.
2. Inventory integration (high): treatments and feed consumption automatically create InventoryTransactions and trigger procurement when low.
3. Finance integration (high): auto-generate FinanceEntries for purchases, sales, treatments and link them to operational records.
4. Field/sector linkage (high): denormalize current location on Livestock and CropCycle for fast queries and map views.
5. Events & automation (medium): emit domain events (livestock.moved, treatment.applied, inventory.low_stock) to drive tasks and notifications.

Design highlights and patterns

- Canonical linking
  - Keep `currentSectorId/currentFieldId/currentFarmId` on Livestock and CropCycle. All cross-module references should use canonical IDs and include `referenceType/referenceId` fields on InventoryTransaction and FinanceEntry.

- Inventory transaction model (single source of truth)
  - InventoryTransaction: { id, inventoryItemId, farmId, qtyDelta, unit, reasonType, referenceType, referenceId, createdBy, createdAt }
  - Always create InventoryTransaction rows inside the same DB transaction as the operational record (e.g., treatment or crop application) to keep consistency.

- Finance integration
  - FinanceEntry: { id, farmId, date, type:'expense'|'income', amount, currency, account, description, referenceType, referenceId }
  - Generate finance drafts asynchronously from inventory transactions or operational events (e.g., sale of livestock) and link them back to the originating record.

- Event-driven automation
  - Emit lightweight domain events on key actions. Use Supabase Realtime for UI updates and a server-side queue or webhooks for heavier tasks (creating procurement Tasks, posting FinanceEntries).

- UX & workflows
  - Treatment flow: In one modal, user selects livestock/crop(s), picks treatment items (pre-filled from common protocols), system validates inventory, creates health/treatment records, decrements inventory, and enqueues finance drafts. Show cost estimate before commit.
  - Sale flow: record buyer info, create movement (sale), mark livestock status, create FinanceEntry (income) and adjust inventory/asset registers.

- Audit & policies
  - Movement, treatment, and crop records must be append-only and auditable (recordedBy, recordedAt). Finance posting and overrides behind higher privilege roles.

Edge cases & conflict handling
- Offline treatment attempted while inventory is consumed by another user: on sync, server returns 409 with current inventory state; convert local treatment to 'pending' and create procurement task.
- Bulk operations: CSV import should validate per-row and provide partial-commit with detailed error reporting.

Queries, indexes & performance
- Index Livestock.currentSectorId, CropCycle.sectorId, InventoryTransaction.inventoryItemId, FinanceEntry.referenceId.
- Use PostGIS GIST index for sector geometries and ST_Simplify for geometry returned to clients by zoom level.

Testing & acceptance
- Integration test: treatment → inventory decrease → health record created → finance draft exists (or queued). Use transactional checks.
- E2E: create sector, add livestock, perform treatment, verify inventory delta, procurement task creation when threshold crossed, and finance draft creation.

Implementation phases (revised)

Phase 0 — Repo & infra setup (pre-work, 1–3 days)
- Goal: prepare a reproducible CI/deploy environment so migrations and sensitive work are safe to run.
- Deliverables:
  - `.env.example` at repo root
  - Minimal GitHub Actions CI skeleton (`.github/workflows/ci.yml`) that runs linters + unit tests and includes a migrations test job
  - Decide canonical deploy target (Cloudflare Pages + Pages Functions) and move legacy `vercel.json`/`netlify.toml` to `deploy/legacy/`
  - Secrets checklist & where to store them (Cloudflare dashboard / GitHub secrets)
- Acceptance criteria:
  - CI job runs and passes on a sample branch
  - Readme shows how to provision dev environment and run tests locally

Phase 1 — Core DB, Auth, RLS & Schema (3–10 days)
- Goal: create canonical DB schema for core entities and enable PostGIS and RLS policies.
- Deliverables:
  - SQL migrations in `migrations/`: initial schema, PostGIS enablement, RLS policies, indexes (GIST for geometry)
  - Prisma schema (optional) or clear statement that SQL migrations are canonical for Supabase
  - RPCs required for spatial lookups (e.g. `find_sector_by_point`)
- Acceptance criteria:
  - Migrations apply cleanly on a test DB
  - PostGIS GIST indexes exist and spatial RPCs return expected results
  - RLS policies enforce access and can be tested with a small harness

Phase 2 — Core CRUD APIs & Frontend skeleton + PWA (5–15 days)
- Goal: deliver core API endpoints (Pages Functions) and a minimal PWA front-end with theme support, mapping and a queue skeleton.
- Deliverables:
  - `functions/api/` endpoints for farms/fields/animals/tasks (GET/POST)
  - Frontend pages wired with TanStack Query for anon reads and auth flows
  - `useTheme()` hook and early-theme apply script to avoid FOWT
  - Service worker registration and initial caching strategies
  - IndexedDB (Dexie) queue skeleton with enqueue/replay UI
- Acceptance criteria:
  - Frontend lists farms and fields when authenticated
  - Theme toggle persists and prevents flash on reload
  - Static pages are available offline and queue entries persist across restarts

Phase 3 — Inventory, Transactions, Offline Sync & Transactional endpoints (7–20 days)
- Goal: implement inventory models, the transactional apply-treatment endpoint, idempotency, and robust offline replay/conflict flow.
- Deliverables:
  - Migrations for `inventory_transactions` and `finance_entries` (if not in Phase 1)
  - `/api/operations/apply-treatment` serverless handler using server-side Postgres (`pg`) and `service_role` connection string; idempotency-key handling and `SELECT ... FOR UPDATE` locking.
  - Integration tests (Docker Postgres) asserting atomicity and 409 behavior on insufficient inventory
  - Client combined treatment modal with optimistic UI and conflict modes
  - Event emission (Realtime or webhook) outside DB transaction
- Acceptance criteria:
  - Integration tests pass (inventory decreased and `inventory_transactions` inserted in same transaction)
  - Retrying with same Idempotency-Key does not double-decrement
  - Offline queued operations replay and handle 409 by marking pending/conflict

Phase 4 — Automation, Finance, Background Workers & Hardening (5–12 days)
- Goal: wire events to background workers that create finance drafts, tasks, and notifications; add monitoring and rate-limiting.
- Deliverables:
  - Background worker to consume `treatment.applied` events and create `finance_entries` / `tasks`
  - `audit_logs` middleware and table
  - Rate-limiting integration (Durable Objects/KV or Redis) and Sentry integration
  - End-to-end tests covering treatment → finance draft creation
  - Production deployment config for Cloudflare Pages + Functions
- Acceptance criteria:
  - Finance draft creation from events verified in staging
  - Monitoring and alerts wired; smoke tests pass after deploy

Cross-phase considerations
- Integration test infra should be available early (Phase 0/1) so DB and transactional tests are repeatable.
- Backup/rollback strategy for migrations must be documented before Phase 1 migrations run in production.
- Enforce `service_role` secrecy using environment secrets; add pre-commit/CI checks to detect accidental leaks.

Minimal MVP (recommended)
- Deliver quickly by focusing on:
  - Create farms & fields
  - Add livestock
  - Create tasks and assign users
  - Manual inventory adjustments (no transactional apply-treatment initially)
  - PWA offline read support and queued create task
- Rationale: reduces risk and gets core user flows into hands of users quickly. Add transactional automation afterward.

Top risks & mitigations (summary)
1. RLS misconfiguration — add a test harness to validate policies before enabling.
2. PostGIS migration failure — test exact migration on staging with same Postgres version.
3. Accidental exposure of `service_role` — keep keys only in cloud secrets; add scanning.
4. Offline sync conflicts — prefer server authority; surface conflicts to user for resolution.
5. Long DB transactions — keep transactions minimal and only lock necessary rows.

Suggested estimates (1 full-stack dev + part-time reviewer)
- Phase 0: 1–3 dev-days
- Phase 1: 3–10 dev-days
- Phase 2: 5–15 dev-days
- Phase 3: 7–20 dev-days
- Phase 4: 5–12 dev-days

Next actionable steps (pick one)
1. Commit `.env.example` + CI skeleton (low-risk)
2. Add DB migration SQL for `inventory_transactions` and `finance_entries`
3. Scaffold OpenAPI / JSON Schemas for key endpoints and generate TypeScript types
4. Implement `/api/operations/apply-treatment` handler with integration tests (requires test DB)

If you'd like, I can implement step (1) and (2) now. Tell me which and I'll proceed.

---

## Serverless endpoint: transactional treatment — detailed spec (no files created yet)

Purpose
- Provide a single server-side API that safely applies a treatment operation (for Livestock or Crops), consumes inventory, records health/treatment records, and emits events for downstream automation (procurement tasks, finance drafts). The endpoint runs transactionally to keep operational data consistent.

High-level contract
- Method: POST
- Path: /api/operations/apply-treatment
- Auth: Bearer JWT (user session) — the serverless function will validate the user and then use Supabase `service_role` key (server-only) to perform DB transactions.
- Idempotency: support Idempotency-Key header to make requests safe to retry.

Request payload (example)
```json
{
  "operationId": "client-generated-uuid-optional",
  "farmId": "farm_01",
  "targetType": "livestock", // or "crop"
  "targetId": "livestock_01", // livestock id or cropCycle id
  "appliedAt": "2025-10-30T12:00:00Z",
  "notes": "Vaccination round A",
  "items": [
   { "inventoryItemId": "inv_01", "qty": 2, "unit": "bottle", "unitCost": 12.5 },
   { "inventoryItemId": "inv_02", "qty": 5, "unit": "kg", "unitCost": 1.2 }
  ],
  "overrideIfInsufficient": false
}
```

Response (success)
- 200 OK with created operational record(s): treatment id, inventory transaction ids, and movement/health records.

Errors
- 400 — validation error (bad payload)
- 401 — unauthorized (invalid/no token)
- 403 — forbidden (user not member or lacks role)
- 409 — conflict (insufficient inventory or concurrent conflicting change)
- 500 — server error

Server-side behavior (detailed steps)
1. Authenticate the request
  - Validate JWT (via Supabase or JWT library). Extract auth.uid() as recordedBy.
2. Authorization check
  - Confirm the user is a member of the farm and has a role permitted to apply treatments (owner/manager/worker depending on policy).
3. Input validation
  - Validate schema (Zod/Joi): targetType in ["livestock","crop"], items non-empty, qty > 0, appliedAt valid.
4. Idempotency check
  - If operationId provided or Idempotency-Key header present, check an `operations` table for an existing operation with same key; if exists, return existing result to make retries safe.
5. Begin DB transaction (server-side Postgres connection using `service_role` credentials)
  - Use a single DB transaction (BEGIN ... COMMIT) to ensure atomicity. Supabase JS client does not support multi-statement transactions; use a server-side Postgres client (node-postgres `pg`) with the `service_role` connection string.
6. For each inventory item in the payload
  a. SELECT qty FROM inventory_items WHERE id = ? FOR UPDATE
  b. If qty < requiredQty AND overrideIfInsufficient is false -> ROLLBACK and return 409 with current qty details
  c. UPDATE inventory_items SET qty = qty - requiredQty
  d. INSERT into inventory_transactions { inventoryItemId, farmId, qtyDelta: -requiredQty, unit, reasonType: 'treatment', referenceType: 'treatment', referenceId: operation_record_id }
7. Insert operational record(s)
  - Insert into `livestock_health_records` or `crop_treatments` with details, createdBy, appliedAt, notes, and attachments if any.
  - If the operation implies movement (rare for treatment), insert LivestockMovement as needed.
8. Commit transaction
9. Emit events and async work
  - Publish event `treatment.applied` with payload { operationId, farmId, targetType, targetId, treatmentId, items } to Realtime or to an internal event queue (e.g., serverless webhook or message queue). Do NOT rely on immediate downstream processing inside the DB transaction.
10. Return success response with created ids and summary.

Idempotency and deduplication
- Require either an `operationId` in the body or an `Idempotency-Key` header. Store idempotency key + response in an `operations` table keyed by user and farm to prevent duplicate consumption of inventory on retries.

Security & secrets
- The endpoint runs server-side and uses the Supabase `service_role` key (stored in Vercel/CI secrets) to perform updates that client cannot. Never expose `service_role` to the browser.
- Validate membership and roles server-side before using `service_role` to perform writes.

Concurrency & locking
- Use SELECT ... FOR UPDATE on inventory rows to serialize concurrent consumptions. Keep transactions as short as possible and avoid long-running synchronous work inside the transaction.

Events & downstream actions
- The endpoint emits `treatment.applied` events. Consumers:
  - Procurement service: creates Task if inventory below reorderThreshold.
  - Finance worker: creates FinanceEntry draft with cost = sum(qty * unitCost) if `unitCost` provided or via configured costing rules.
  - Notifications: push to assigned users/in-app.

Testing & acceptance criteria
- Unit tests: schema validation, idempotency logic, auth/authorization checks.
- Integration tests (use a test Postgres instance): successful treatment reduces inventory, creates health record, and inserts inventory transactions in one transaction; insufficient inventory returns 409 and no changes.
- E2E test: mobile quick-treatment flow producing the same backend results; simulate offline queue + resync.

Example TypeScript pseudo-code (server-side handler outline)
```ts
import { Client } from 'pg';
import { validateTreatmentPayload } from './validators';

export default async function handler(req, res) {
  const payload = req.body;
  const user = await verifyJwt(req.headers.authorization);
  validateTreatmentPayload(payload);

  const client = new Client({ connectionString: process.env.SUPABASE_SERVICE_ROLE_DB });
  await client.connect();
  try {
   await client.query('BEGIN');
   // idempotency check
   // lock and update inventory rows using SELECT FOR UPDATE
   // insert inventory_transactions
   // insert livestock_health_records or crop_treatments
   await client.query('COMMIT');
   // emit event (outside transaction)
   res.status(200).json({ success:true, data:{ /* ids */ } });
  } catch (err) {
   await client.query('ROLLBACK');
   // translate errors to 409/400/500
   res.status(500).json({ success:false, error:{ message: err.message } });
  } finally {
   await client.end();
  }
}
```

Observability and monitoring
- Log attempts, successes, and errors with structured logs (include operationId, userId, farmId).
- Track metrics: treatment success rate, conflicts (409), inventory insufficient rate, average transaction duration.

Rate-limiting and quotas
- Add rate-limiting per-user/per-farm to prevent abuse (e.g., 60 treatment ops per minute per farm) and guardrails for bulk imports.

Acceptance criteria (short)
- A treatment request with valid items reduces inventory and creates health/treatment and inventory transaction records atomically.
- Retry with same Idempotency-Key does not double-decrement inventory.
- Insufficient inventory returns 409 and no DB mutation occurs.

Notes
- This plan intentionally avoids creating files yet. If you approve this spec, I can generate the migration(s) and serverless function in the repo in the next step.

## Fill-in: Contracts, Data Models, Auth, Offline, Tests, CI, Security & Monitoring

The sections below close the gaps in the previous architecture doc. They are intended to be copy-paste ready for implementation and test scaffolding.

### 1) API contracts (OpenAPI-lite) — high priority
Below are minimal OpenAPI-style endpoint stubs for the highest-impact endpoints. These stubs focus on the apply-treatment transactional flow plus common CRUDs. Use these to generate server handlers, validation, and tests.

- POST /api/operations/apply-treatment
  - Summary: Apply a treatment to livestock or crop(s); consumes inventory and records operational records transactionally.
  - Security: bearerAuth (JWT)
  - Request JSON (application/json):
    - operationId?: string (uuid)
    - farmId: string (uuid)
    - targetType: enum ["livestock","crop"]
    - targetId: string (uuid)
    - appliedAt: string (iso8601)
    - notes?: string
    - items: array of { inventoryItemId: string, qty: number, unit: string, unitCost?: number }
    - overrideIfInsufficient?: boolean
  - Responses:
    - 200: { treatmentId, inventoryTransactionIds: string[], summary }
    - 400,401,403,409,500 as previously specified

- POST /api/inventory/transactions (internal)
  - Summary: create inventory transactions (used by workers and RPCs). Requires service role.

- GET /api/farms/:id
  - Summary: returns farm details including `farm_settings` and `defaultTheme`.

Notes: Use Ajv/Zod to generate server-side validation from these shapes; generate client types with openapi-generator or zod-to-ts for consistency.

### 2) Core JSON Schemas (canonical data models)
Provide canonical shapes for InventoryTransaction and FinanceEntry which the DB/migrations must support.

InventoryTransaction (json schema - abbreviated)
{
  "id": "uuid",
  "inventoryItemId": "uuid",
  "farmId": "uuid",
  "qtyDelta": "number",
  "unit": "string",
  "reasonType": "treatment|consumption|purchase|adjustment",
  "referenceType": "string|null",
  "referenceId": "uuid|null",
  "createdBy": "uuid",
  "createdAt": "timestamptz"
}

FinanceEntry (json schema - abbreviated)
{
  "id": "uuid",
  "farmId": "uuid",
  "date": "date",
  "type": "expense|income|transfer",
  "amount": "decimal",
  "currency": "string",
  "account": "string",
  "description": "string",
  "referenceType": "string|null",
  "referenceId": "uuid|null",
  "createdBy": "uuid",
  "createdAt": "timestamptz"
}

Practical note: add these to `prisma/schema.prisma` (or SQL migrations) and include indexes on (farmId), (referenceId) and any foreign-keys used by frequent queries.

### 3) Suggested SQL (migrations) — InventoryTransaction & FinanceEntry
Add as migration files in `migrations/` or as Prisma raw SQL steps (Postgres):

-- migrations/00xx_add_inventory_transactions_and_finance.sql
CREATE TABLE inventory_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id uuid NOT NULL REFERENCES inventory_items(id),
  farm_id uuid NOT NULL REFERENCES farms(id),
  qty_delta numeric NOT NULL,
  unit text,
  reason_type text NOT NULL,
  reference_type text,
  reference_id uuid,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_inventory_transactions_farm ON inventory_transactions(farm_id);

CREATE TABLE finance_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid NOT NULL REFERENCES farms(id),
  entry_date date NOT NULL,
  type text NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  account text,
  description text,
  reference_type text,
  reference_id uuid,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_finance_entries_farm ON finance_entries(farm_id);

### 4) Auth & Roles design (concrete)
- Authentication: use Supabase Auth (email/password + OTP optional). Frontend uses `supabase.auth` for sign-in; server functions validate JWT via Supabase public key or call Supabase `/auth` endpoints.
- JWT verification pattern for Pages Functions: verify Authorization header with Supabase JWT SDK or fetch user profile via `supabase.auth.getUser()` on the server.
- Roles: canonical roles are `owner`, `manager`, `worker`, `accounting`, `admin`.
  - Map roles to capabilities: `owner` and `manager` can modify farm-level data; `worker` can apply tasks; `accounting` can view/approve finance; `admin` can manage global settings.
- RLS: implement per-table policies using `auth.uid()`; use `farm_members`/`farm_users` join when checking membership. Example policy patterns are already in `build.md` and should be expanded to cover `inventory_transactions`, `finance_entries`, `tasks`.

### 5) Offline & Sync strategy — specifics
- Local queue design (IndexedDB via Dexie): store queued operations as { id, operationId, type, payload, createdAt, attempts, lastError }.
- Queue replay algorithm:
  1. On reconnect, take next queued operation, mark as IN_PROGRESS, submit to server with Idempotency-Key = operationId.
  2. On 200 -> mark completed and remove; on 409 -> mark PENDING_CONFLICT and surface UI to user.
  3. Retry transient errors up to N attempts (configurable) with backoff.
- Conflict UX: for PENDING_CONFLICT show server-state vs local-intent diff and allow (a) merge, (b) overwrite (if allowed by role), (c) cancel + create procurement task.
- Conflict handling for inventory: prefer server authority; treat client-submitted treatment as tentative when server responds 409.

### 6) Tests & QA matrix (concrete checklist)
- Unit tests: Vitest for components and small logic (target 80% coverage minimum for core modules). Key unit tests: useTheme, syncQueue, inventory math helpers.
- Integration tests: Node-level tests that run against a test Postgres (Docker) for the treatment transaction (happy path + insufficient inventory). Use testing-library + supertest or use Playwright for full stacks.
- E2E: Playwright tests for key flows: onboarding → create farm → create sector → add animal → apply treatment offline→ sync.
- Acceptance criteria: integration test assert inventory decrease and inventory_transactions row inserted in same transaction.

### 7) `.env.example` and minimal CI (GitHub Actions)
Add `.env.example` at repo root with variables and short descriptions:
```
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_URL=

# Map / 3rd party
VITE_MAPBOX_TOKEN=

# Cloudflare Pages / Functions (if used)
CF_ACCOUNT_ID=
CF_API_TOKEN=
```

Minimal GitHub Actions CI (placeholder) - create `.github/workflows/ci.yml` to run tests and migrations in CI using supabase/pg or test container. Keep secrets in repo settings. (If you want I can scaffold this next.)

### 8) Security, observability & rate-limiting
- Rate-limiting: implement per-user/per-farm buckets in Pages Functions (in-memory for dev, Redis or Cloudflare Workers KV + Durable Objects for prod). Start with conservative default: 120 requests/min per user, 1000 requests/min per farm for batch flows.
- Monitoring: integrate Sentry (server + client) and instrument logs with structured JSON including operationId, userId, farmId.
- Auditing: all operational mutations (treatments, movements, finance posts) must insert audit logs with actor, IP (if available), and timestamp. Store in `audit_logs` table with retention policy.

### 9) Deployment decision & repo hygiene (actionable)
- Canonical target: Cloudflare Pages + Pages Functions (recommended for free-tier performance reasons). Remove `vercel.json` and `netlify.toml` from active branches or move them into `deploy/legacy/` to avoid confusion.
- Keep Prisma schema only if you plan to use Prisma locally; otherwise keep SQL migrations as canonical for Supabase.

### 10) Next actionable steps (small, low-risk order)
1. Commit `.env.example` and CI skeleton. (low risk)
2. Add DB migration SQL file for InventoryTransaction and FinanceEntry. (safe, reviewable)
3. Scaffold OpenAPI / JSON Schemas for key endpoints and generate TypeScript types. (unblocks frontend)
4. Implement serverless handler for apply-treatment in `functions/api/operations/apply-treatment.js` (or .ts) with tests; requires SUPABASE_SERVICE_ROLE and test DB.

If you'd like, I can implement step (1) and (2) immediately in this repo. Tell me which step to start with and I'll proceed.

