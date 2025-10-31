// Cloudflare API client with authentication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// In-memory access token to avoid localStorage by default. Falls back to legacy localStorage for migration.
let inMemoryAccessToken: string | null = null;

const getAuthToken = () => {
  return inMemoryAccessToken || localStorage.getItem('auth_token')
}

export const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = getAuthToken()

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      // default credentials not included; refresh flow uses a dedicated call with credentials
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API request failed: ${response.statusText}`)
    }

    return response.json()
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' })
  },

  post(endpoint: string, data: Record<string, unknown>) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  put(endpoint: string, data: Record<string, unknown>) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' })
  },

  // File upload method (doesn't set Content-Type to allow FormData boundary)
  upload(endpoint: string, formData: FormData) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = getAuthToken()

    return fetch(url, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Upload failed: ${response.statusText}`)
      }
      return response.json()
    })
  },
}

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/api/auth/validate')
    return response.user || null
  } catch (err) {
    return null
  }
}

// Call refresh endpoint (sends HttpOnly cookie automatically). Returns new access token.
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return null
    const body = await res.json()
    if (body?.accessToken) {
      inMemoryAccessToken = body.accessToken
      return body.accessToken
    }
    return null
  } catch (e) {
    return null
  }
}

export const signIn = async (email: string, password: string) => {
  const response = await apiClient.post('/api/auth/login', { email, password })
  // Server sets HttpOnly refresh cookie. We receive short-lived access token in body.
  const token = response.accessToken || response.token
  if (token) {
    inMemoryAccessToken = token as string
    // Do not persist to localStorage by default. For migration, preserve old behavior if present.
  }
  return { data: response, error: null }
}

export const signUp = async (email: string, password: string, name: string) => {
  const response = await apiClient.post('/api/auth/signup', { email, password, name })
  const token = (response as any).accessToken || (response as any).token
  if (token) {
    inMemoryAccessToken = token as string
  }
  return { data: response, error: null }
}

export const signOut = async () => {
  // Call server to revoke session and clear cookie
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch (e) {
    // ignore
  }
  inMemoryAccessToken = null
  localStorage.removeItem('auth_token')
  return { error: null }
}

// Expose a setter so boot-time migration can place the returned access token in-memory
export const setAccessToken = (token: string | null) => {
  inMemoryAccessToken = token;
}