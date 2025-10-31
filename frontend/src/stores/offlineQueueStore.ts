import { create } from 'zustand';

interface OfflineOperation {
  id?: number;
  type: 'create_inventory_item' | 'update_inventory_item' | 'delete_inventory_item' | 'apply_treatment';
  payload: Record<string, unknown>;
  timestamp: number;
  retryCount: number;
  status: 'pending' | 'syncing' | 'failed' | 'conflict';
  error?: string;
  conflictData?: Record<string, unknown>;
}

interface OfflineQueueState {
  isOnline: boolean;
  queueLength: number;
  conflicts: OfflineOperation[];
  setIsOnline: (online: boolean) => void;
  setQueueLength: (length: number) => void;
  setConflicts: (conflicts: OfflineOperation[]) => void;
  updateQueueStats: (length: number, conflicts: OfflineOperation[]) => void;
  resolveConflict: (id: number, resolution: 'overwrite' | 'discard' | 'merge') => void;
}

export const useOfflineQueueStore = create<OfflineQueueState>((set, get) => ({
  isOnline: navigator.onLine,
  queueLength: 0,
  conflicts: [],
  setIsOnline: (online) => set({ isOnline: online }),
  setQueueLength: (length) => set({ queueLength: length }),
  setConflicts: (conflicts) => set({ conflicts }),
  updateQueueStats: (length, conflicts) => set({ queueLength: length, conflicts }),
  resolveConflict: (id, resolution) => {
    const { conflicts } = get();
    const updatedConflicts = conflicts.filter(conflict => conflict.id !== id);
    set({ conflicts: updatedConflicts });
    // TODO: Implement actual conflict resolution logic
    console.log(`Resolved conflict ${id} with resolution: ${resolution}`);
  },
}));