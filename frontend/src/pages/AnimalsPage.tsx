import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';

interface Animal {
  id: string;
  farm_id: string;
  type: string;
  breed?: string;
  age_months?: number;
  health_status: string;
  created_at: string;
}

export function AnimalsPage() {
  const { getAuthHeaders } = useAuth();

  const { data: animals, isLoading, error } = useQuery({
    queryKey: ['animals'],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/animals', {
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to fetch animals');
      }

      return response.json() as Promise<Animal[]>;
    }
  });

  if (isLoading) return <div>Loading animals...</div>;
  if (error) return <div>Error loading animals: {error.message}</div>;

  return (
    <div className="animals-page">
      <h1>Animals</h1>
      <div className="animals-list">
        {animals?.map((animal) => (
          <div key={animal.id} className="animal-card">
            <h2>{animal.type}</h2>
            {animal.breed && <p>Breed: {animal.breed}</p>}
            {animal.age_months && <p>Age: {animal.age_months} months</p>}
            <p>Health: {animal.health_status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimalsPage;