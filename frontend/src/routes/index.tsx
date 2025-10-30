import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

function IndexComponent() {
  const { user } = useAuth();

  if (user) {
    throw redirect({
      to: '/farms',
    });
  } else {
    throw redirect({
      to: '/login',
    });
  }

  return null;
}

export const Route = createFileRoute('/')({
  component: IndexComponent,
});