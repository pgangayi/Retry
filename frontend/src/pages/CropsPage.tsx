import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Plus, Crop, Sprout, Target, TrendingUp } from 'lucide-react';

interface CropType {
  id: string;
  name: string;
  category: string;
  description: string;
  growth_days_min: number;
  growth_days_max: number;
  optimal_temperature_min: number;
  optimal_temperature_max: number;
  water_requirements_mm: number;
}

interface CropVariety {
  id: string;
  name: string;
  description: string;
  maturity_days: number;
  yield_potential: number;
  crop_type_name: string;
  category: string;
}

interface PlannedCrop {
  field_id: string;
  field_name: string;
  area_hectares: number;
  variety_name: string;
  crop_type: string;
  category: string;
  planting_date: string | null;
  expected_harvest_date: string | null;
  actual_harvest_date: string | null;
  expected_yield_tons: number | null;
  actual_yield_tons: number | null;
  farm_name: string;
  days_to_harvest: number | null;
}

export function CropsPage() {
  const { getAuthHeaders } = useAuth();
  const queryClient = useQueryClient();
  const [selectedCropType, setSelectedCropType] = useState<string>('');
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [_selectedField, setSelectedField] = useState<string>('');

  // Fetch crop types
  const { data: cropTypes, isLoading: _loadingTypes } = useQuery({
    queryKey: ['crop-types'],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/crops/types', { headers });
      if (!response.ok) throw new Error('Failed to fetch crop types');
      return response.json() as Promise<CropType[]>;
    }
  });

  // Fetch crop varieties
  const { data: cropVarieties } = useQuery({
    queryKey: ['crop-varieties', selectedCropType],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const url = selectedCropType ? `/api/crops/varieties?crop_type_id=${selectedCropType}` : '/api/crops/varieties';
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error('Failed to fetch crop varieties');
      return response.json() as Promise<CropVariety[]>;
    }
  });

  // Fetch planned crops
  const { data: plannedCrops, isLoading: loadingCrops } = useQuery({
    queryKey: ['planned-crops'],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/crops', { headers });
      if (!response.ok) throw new Error('Failed to fetch planned crops');
      return response.json() as Promise<PlannedCrop[]>;
    }
  });

  // Fetch fields for planning
  const { data: fields } = useQuery({
    queryKey: ['fields'],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/fields', { headers });
      if (!response.ok) throw new Error('Failed to fetch fields');
      return response.json();
    }
  });

  // Plan crop mutation
  const planCropMutation = useMutation({
    mutationFn: async (data: any) => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/crops', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'plan_crop', ...data })
      });
      if (!response.ok) throw new Error('Failed to plan crop');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planned-crops'] });
      setIsPlanDialogOpen(false);
      setSelectedField('');
    }
  });

  const handlePlanCrop = (formData: FormData) => {
    const selectedVariety = cropVarieties?.find(v => v.id === formData.get('crop_variety_id'));
    if (!selectedVariety) return;

    planCropMutation.mutate({
      field_id: formData.get('field_id'),
      crop_variety_id: formData.get('crop_variety_id'),
      planting_date: formData.get('planting_date'),
      expected_harvest_date: formData.get('expected_harvest_date'),
      planting_method: formData.get('planting_method'),
      seed_rate_kg_ha: parseFloat(formData.get('seed_rate_kg_ha') as string) || null,
      expected_yield_tons: parseFloat(formData.get('expected_yield_tons') as string) || null,
      soil_type: formData.get('soil_type'),
      irrigation_type: formData.get('irrigation_type')
    });
  };

  const getStatusColor = (daysToHarvest: number | null, expectedHarvest: string | null, actualHarvest: string | null) => {
    if (actualHarvest) return 'bg-green-500';
    if (!expectedHarvest) return 'bg-gray-400';
    if (!daysToHarvest) return 'bg-yellow-400';
    if (daysToHarvest > 30) return 'bg-blue-500';
    if (daysToHarvest > 0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusText = (daysToHarvest: number | null, expectedHarvest: string | null, actualHarvest: string | null) => {
    if (actualHarvest) return 'Harvested';
    if (!expectedHarvest) return 'Not planned';
    if (!daysToHarvest) return 'Ready';
    if (daysToHarvest > 30) return `Growing (${daysToHarvest} days)`;
    if (daysToHarvest > 0) return `Near harvest (${daysToHarvest} days)`;
    return 'Overdue';
  };

  return (
    <div className="crops-page container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Crop className="h-8 w-8" />
            Crop Management
          </h1>
          <p className="text-gray-600 mt-2">
            Plan, monitor, and manage your crop production across all fields
          </p>
        </div>
        
        <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Plan New Crop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Plan Crop for Field</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              handlePlanCrop(new FormData(e.currentTarget));
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="field_id">Field</Label>
                  <Select name="field_id" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields?.map((field: any) => (
                        <SelectItem key={field.id} value={field.id}>
                          {field.name} ({field.farm_name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="crop_type">Crop Type</Label>
                  <Select 
                    value={selectedCropType} 
                    onValueChange={setSelectedCropType}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {selectedCropType && (
                <div className="space-y-2">
                  <Label htmlFor="crop_variety_id">Variety</Label>
                  <Select name="crop_variety_id" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select variety" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropVarieties?.map((variety) => (
                        <SelectItem key={variety.id} value={variety.id}>
                          {variety.name} (Maturity: {variety.maturity_days} days)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="planting_date">Planting Date</Label>
                  <Input type="date" name="planting_date" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expected_harvest_date">Expected Harvest Date</Label>
                  <Input type="date" name="expected_harvest_date" required />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="planting_method">Planting Method</Label>
                  <Select name="planting_method">
                    <SelectTrigger>
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct_seeding">Direct Seeding</SelectItem>
                      <SelectItem value="transplanting">Transplanting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seed_rate_kg_ha">Seed Rate (kg/ha)</Label>
                  <Input type="number" step="0.1" name="seed_rate_kg_ha" placeholder="Optional" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expected_yield_tons">Expected Yield (tons)</Label>
                  <Input type="number" step="0.1" name="expected_yield_tons" placeholder="Optional" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soil_type">Soil Type</Label>
                  <Select name="soil_type">
                    <SelectTrigger>
                      <SelectValue placeholder="Soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="loam">Loam</SelectItem>
                      <SelectItem value="sand">Sand</SelectItem>
                      <SelectItem value="sandy_loam">Sandy Loam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="irrigation_type">Irrigation</Label>
                  <Select name="irrigation_type">
                    <SelectTrigger>
                      <SelectValue placeholder="Irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rainfed">Rainfed</SelectItem>
                      <SelectItem value="drip">Drip</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsPlanDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={planCropMutation.isPending}>
                  {planCropMutation.isPending ? 'Planning...' : 'Plan Crop'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fields</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fields?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plannedCrops?.filter(crop => !crop.actual_harvest_date).length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready for Harvest</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plannedCrops?.filter(crop => crop.days_to_harvest !== null && crop.days_to_harvest <= 0 && !crop.actual_harvest_date).length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Area (ha)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plannedCrops?.reduce((sum, crop) => sum + (crop.area_hectares || 0), 0).toFixed(1) || '0.0'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crop List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Planned Crops</h2>
        
        {loadingCrops ? (
          <div className="text-center py-8">Loading crops...</div>
        ) : !plannedCrops || plannedCrops.length === 0 ? (
          <div className="text-center py-8">
            <Crop className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No crops planned yet</p>
            <Button onClick={() => setIsPlanDialogOpen(true)} className="mt-4">
              Plan Your First Crop
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plannedCrops.map((crop) => (
              <Card key={`${crop.field_id}-${crop.variety_name}`} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{crop.field_name}</CardTitle>
                      <p className="text-sm text-gray-600">{crop.farm_name}</p>
                    </div>
                    <Badge className={`${getStatusColor(crop.days_to_harvest, crop.expected_harvest_date, crop.actual_harvest_date)} text-white`}>
                      {getStatusText(crop.days_to_harvest, crop.expected_harvest_date, crop.actual_harvest_date)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {crop.variety_name && (
                      <div>
                        <span className="font-medium">Crop:</span> {crop.variety_name} ({crop.crop_type})
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Area:</span> {crop.area_hectares} ha
                      </div>
                      {crop.expected_yield_tons && (
                        <div>
                          <span className="font-medium">Expected Yield:</span> {crop.expected_yield_tons} t
                        </div>
                      )}
                    </div>
                    
                    {crop.planting_date && (
                      <div className="text-sm">
                        <span className="font-medium">Planted:</span> {new Date(crop.planting_date).toLocaleDateString()}
                      </div>
                    )}
                    
                    {crop.expected_harvest_date && (
                      <div className="text-sm">
                        <span className="font-medium">Expected Harvest:</span> {new Date(crop.expected_harvest_date).toLocaleDateString()}
                      </div>
                    )}
                    
                    {crop.actual_harvest_date && (
                      <div className="text-sm text-green-600">
                        <span className="font-medium">Harvested:</span> {new Date(crop.actual_harvest_date).toLocaleDateString()}
                      </div>
                    )}
                    
                    {crop.actual_yield_tons && (
                      <div className="text-sm font-medium text-green-600">
                        Actual Yield: {crop.actual_yield_tons} tons
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropsPage;