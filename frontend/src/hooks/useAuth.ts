import { useState, useEffect } from 'react'
import { getCurrentUser, signIn, signOut, signUp } from '../lib/cloudflare'

// Define a simple User type for Cloudflare auth
interface User {
  id: string
  email: string
  // Add other user properties as needed
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    getCurrentUser().then((user) => {
      setUser(user)
      setLoading(false)
    })

    // TODO: Implement auth state change listener for Cloudflare
    // For now, we'll just set loading to false
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await signIn(email, password)
    if (error) throw error
    setUser(data.user)
    return data
  }

  const signup = async (email: string, password: string, name: string) => {
    const { data, error } = await signUp(email, password, name)
    if (error) throw error
    setUser(data.user)
    return data
  }

  const logout = async () => {
    const { error } = await signOut()
    if (error) throw error
    setUser(null)
  }

  // Helper function to get auth headers for API calls
  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    const token = localStorage.getItem('auth_token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  return {
    user,
    loading,
    login,
    signup,
    logout,
    getAuthHeaders,
  }
}