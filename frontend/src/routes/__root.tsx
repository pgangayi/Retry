import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import '../App.css';

const queryClient = new QueryClient();

function RootLayout() {
  const { theme } = useTheme();
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app" data-theme={theme}>
        <header>
          <h1>Farmers Boot</h1>
          <nav>
            {user ? (
              <>
                <Link to="/farms">Farms</Link>
                <Link to="/fields">Fields</Link>
                <Link to="/animals">Animals</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/queue">Queue</Link>
                <button onClick={signOut}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
              </>
            )}
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});