import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/cloudflare'

// Farms
export const useFarms = () => {
  return useQuery({
    queryKey: ['farms'],
    queryFn: () => apiClient.get('/api/farms'),
  })
}

export const useCreateFarm = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/api/farms', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] })
    },
  })
}

// Fields
export const useFields = () => {
  return useQuery({
    queryKey: ['fields'],
    queryFn: () => apiClient.get('/api/fields'),
  })
}

export const useCreateField = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/api/fields', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] })
    },
  })
}

// Animals
export const useAnimals = () => {
  return useQuery({
    queryKey: ['animals'],
    queryFn: () => apiClient.get('/api/animals'),
  })
}

export const useCreateAnimal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/api/animals', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] })
    },
  })
}

// Tasks
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => apiClient.get('/api/tasks'),
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/api/tasks', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

// Inventory
export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: () => apiClient.get('/api/inventory'),
  })
}

export const useCreateInventoryItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/api/inventory', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
    },
  })
}

export const useLowStockItems = () => {
  return useQuery({
    queryKey: ['inventory', 'low-stock'],
    queryFn: () => apiClient.get('/api/inventory/low-stock'),
  })
}

// Inventory Transactions
export const useInventoryTransactions = (farmId?: string) => {
  return useQuery({
    queryKey: ['inventory-transactions', farmId],
    queryFn: () => apiClient.get(`/api/inventory/transactions${farmId ? `?farm_id=${farmId}` : ''}`),
  })
}

export const useCreateInventoryTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/api/inventory/transactions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-transactions'] })
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      queryClient.invalidateQueries({ queryKey: ['inventory', 'low-stock'] })
    },
  })
}

// Finance
export const useFinanceEntries = () => {
  return useQuery({
    queryKey: ['finance-entries'],
    queryFn: () => apiClient.get('/api/finance/entries'),
  })
}

export const useCreateFinanceEntry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/api/finance/entries', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-entries'] })
    },
  })
}

export const useFinanceReport = (type: string, params?: Record<string, string>) => {
  const queryString = params ? `?${new URLSearchParams(params)}` : ''
  return useQuery({
    queryKey: ['finance-reports', type, params],
    queryFn: () => apiClient.get(`/api/finance/reports/${type}${queryString}`),
  })
}

// Files
export const useFiles = (farmId?: string) => {
  return useQuery({
    queryKey: ['files', farmId],
    queryFn: () => apiClient.get(`/api/files${farmId ? `?farm_id=${farmId}` : ''}`),
  })
}

export const useUploadFile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => apiClient.upload('/api/files', formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}

export const useDeleteFile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (filename: string) => apiClient.delete(`/api/files/${filename}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}

// Operations
export const useApplyTreatment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/api/operations/apply-treatment', data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      queryClient.invalidateQueries({ queryKey: ['inventory-transactions'] })
      queryClient.invalidateQueries({ queryKey: ['animals'] })
    },
  })
}