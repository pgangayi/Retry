// DIAGNOSTIC LOGS: Architecture Analysis vs build.md specs
console.log('=== ARCHITECTURE DIAGNOSTIC ===');
console.log('Routing: Using React Router instead of TanStack Router (build.md spec)');
console.log('Auth: Using custom JWT instead of Supabase Auth (build.md spec)');
console.log('State Management: TanStack Query present but not fully integrated');
console.log('UI Framework: shadcn/ui components present but not fully implemented');
console.log('Maps: Mapbox GL JS integrated');
console.log('Offline: Dexie IndexedDB present but incomplete schema');
console.log('Backend: Using D1 instead of Supabase (build.md spec)');
console.log('=== END DIAGNOSTIC ===');
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { queryClient } from './lib/queryClient'
import './index.css'
import { setAccessToken } from './lib/cloudflare'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

async function boot() {
  // Migrate legacy localStorage token to cookie-based session if present
  try {
    const legacy = localStorage.getItem('auth_token');
    if (legacy) {
      const res = await fetch('/api/auth/migrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: legacy }),
        credentials: 'include'
      });
      if (res.ok) {
        const body = await res.json();
        if (body?.accessToken) {
          setAccessToken(body.accessToken);
        }
        // remove legacy token to complete migration
        localStorage.removeItem('auth_token');
      }
    }
  } catch (e) {
    // migration failure should not block app
    console.warn('Auth migration failed', e);
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>,
  )
}

void boot();

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}