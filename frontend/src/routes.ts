import { createRouter } from '@tanstack/react-router';

// Import routes
import { Route as rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as loginRoute } from './routes/login';
import { Route as signupRoute } from './routes/signup';
import { Route as farmsRoute } from './routes/farms';
import { Route as fieldsRoute } from './routes/fields';
import { Route as animalsRoute } from './routes/animals';
import { Route as tasksRoute } from './routes/tasks';
import { Route as queueRoute } from './routes/queue';

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  farmsRoute,
  fieldsRoute,
  animalsRoute,
  tasksRoute,
  queueRoute,
]);

// Create a new router instance
export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}