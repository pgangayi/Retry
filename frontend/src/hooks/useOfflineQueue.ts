import { useEffect } from 'react';
import Dexie, { Table } from 'dexie';
import { useOfflineQueueStore } from '../stores/offlineQueueStore';

// Define IndexedDB schema for offline-first functionality
export interface SyncOperation {
  id?: number;
  operation: 'create' | 'update' | 'delete';
  entityType: string;
  entityId: string;
  data: Record<string, unknown>;
  createdAt: number;
  status: 'pending' | 'syncing' | 'synced' | 'failed';
  retries: number;
  error?: string;
}

export interface Farm {
  id: string;
  name: string;
  location?: Record<string, unknown>;
  timezone?: string;
  currency?: string;
  settings?: Record<string, unknown>;
  ownerId: string;
  createdAt: string;
  lastSyncedAt?: number;
}

export interface Field {
  id: string;
  farmId: string;
  name: string;
  areaHectares?: number;
  soilType?: string;
  notes?: string;
  boundary?: Record<string, unknown>;
  createdAt: string;
  lastSyncedAt?: number;
}

export interface Sector {
  id: string;
  fieldId: string;
  name: string;
  geom?: Record<string, unknown>;
  cropType?: string;
  plantingDate?: string;
  expectedHarvest?: string;
  notes?: string;
  createdAt: string;
  lastSyncedAt?: number;
}

export interface Animal {
  id: string;
  farmId: string;
  tag: string;
  species: string;
  breed?: string;
  sex?: 'male' | 'female' | 'unknown';
  birthDate?: string;
  currentSectorId?: string;
  status: 'active' | 'sold' | 'deceased' | 'quarantine';
  notes?: string;
  createdAt: string;
  lastSyncedAt?: number;
}

export interface Task {
  id: string;
  farmId: string;
  title: string;
  description?: string;
  assignedTo?: string;
  relatedEntityType?: 'field' | 'sector' | 'animal' | 'crop_cycle';
  relatedEntityId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  dueDate?: string;
  completedAt?: string;
  createdBy: string;
  createdAt: string;
  lastSyncedAt?: number;
}

export interface InventoryItem {
  id: string;
  farmId: string;
  name: string;
  category: string;
  sku?: string;
  unit: string;
  quantityOnHand: number;
  reorderThreshold?: number;
  unitCost?: number;
  supplier?: string;
  notes?: string;
  createdAt: string;
  lastSyncedAt?: number;
}

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

// Sync manager for offline operations
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
            error: error instanceof Error ? error.message : 'Unknown error',
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
        'Authorization': `Bearer ${await this.getAuthToken()}`,
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
      await (db as any)[op.entityType].put(result.data);
    } else if (op.operation === 'delete') {
      await (db as any)[op.entityType].delete(op.entityId);
    }
  }

  private async getAuthToken(): Promise<string> {
    // TODO: Implement token retrieval for Cloudflare auth
    // For now, return empty string
    return '';
  }
}

export const syncManager = new SyncManager();

// Listen for online event
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    syncManager.sync();
  });
}

export function useOfflineQueue() {
  const { isOnline, queueLength, conflicts, resolveConflict } = useOfflineQueueStore();

  useEffect(() => {
    // Initialize sync on mount
    if (navigator.onLine) {
      syncManager.sync();
    }
  }, []);

  const queueOperation = async (operation: Omit<SyncOperation, 'id' | 'status' | 'retries'>) => {
    await syncManager.queueOperation(operation);
  };

  return {
    queueOperation,
    isOnline,
    queueLength,
    conflicts,
    resolveConflict,
  };
}