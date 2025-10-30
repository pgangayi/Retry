import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface Farm {
  id: string;
  name: string;
  location: string;
  area_hectares?: number;
  created_at: string;
}

export function FarmsPage() {
  const { data: farms, isLoading, error } = useQuery({
    queryKey: ['farms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Farm[];
    }
  });

  if (isLoading) return <div>Loading farms...</div>;
  if (error) return <div>Error loading farms: {error.message}</div>;

  return (
    <div className="farms-page">
      <h1>Farms</h1>
      <div className="farms-list">
        {farms?.map((farm) => (
          <div key={farm.id} className="farm-card">
            <h2>{farm.name}</h2>
            <p>{farm.location}</p>
            {farm.area_hectares && <p>{farm.area_hectares} hectares</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmsPage;