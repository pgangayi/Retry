import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Camera, Plus, Eye, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface CropObservation {
  id: string;
  observation_date: string;
  growth_stage: string;
  plant_height_cm: number | null;
  leaf_color: string;
  pest_presence: string[];
  disease_presence: string[];
  weed_pressure: string;
  soil_moisture: string;
  plant_density_per_m2: number | null;
  uniformity_score: number | null;
  health_score: number | null;
  photos: string[];
  notes: string;
  field_name: string;
  crop_variety_name: string;
}

interface HarvestRecord {
  id: string;
  harvest_date: string;
  quantity_harvested: number;
  unit: string;
  quality_grade: string;
  total_value: number | null;
  field_name: string;
  crop_variety_name: string;
}

interface CropOperation {
  id: string;
  operation_type: string;
  operation_name: string;
  scheduled_date: string;
  completed_date: string | null;
  status: string;
  field_name: string;
  cost: number | null;
}

export function CropMonitoring({ fieldId }: { fieldId: string }) {
  const { getAuthHeaders } = useAuth();
  const queryClient = useQueryClient();
  const [isObservationDialogOpen, setIsObservationDialogOpen] = useState(false);
  const [isHarvestDialogOpen, setIsHarvestDialogOpen] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState<CropObservation | null>(null);

  // Fetch crop observations
  const { data: observations } = useQuery({
    queryKey: ['crop-observations', fieldId],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/crops/observations?field_id=${fieldId}`, { headers });
      if (!response.ok) throw new Error('Failed to fetch observations');
      return response.json() as Promise<CropObservation[]>;
    },
    enabled: !!fieldId
  });

  // Fetch harvest records
  const { data: harvests } = useQuery({
    queryKey: ['harvest-records', fieldId],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/crops/harvest?field_id=${fieldId}`, { headers });
      if (!response.ok) throw new Error('Failed to fetch harvest records');
      const data = await response.json();
      return data.harvests as HarvestRecord[];
    },
    enabled: !!fieldId
  });

  // Fetch crop operations
  const { data: operations } = useQuery({
    queryKey: ['crop-operations', fieldId],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/crops/operations?field_id=${fieldId}`, { headers });
      if (!response.ok) throw new Error('Failed to fetch operations');
      return response.json() as Promise<CropOperation[]>;
    },
    enabled: !!fieldId
  });

  // Create observation mutation
  const createObservationMutation = useMutation({
    mutationFn: async (data: any) => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/crops/observations', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ field_id: fieldId, ...data })
      });
      if (!response.ok) throw new Error('Failed to create observation');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crop-observations', fieldId] });
      setIsObservationDialogOpen(false);
    }
  });

  // Record harvest mutation
  const recordHarvestMutation = useMutation({
    mutationFn: async (data: any) => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/crops/harvest', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ field_id: fieldId, ...data })
      });
      if (!response.ok) throw new Error('Failed to record harvest');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvest-records', fieldId] });
      queryClient.invalidateQueries({ queryKey: ['planned-crops'] });
      setIsHarvestDialogOpen(false);
    }
  });

  const getHealthStatusColor = (score: number | null) => {
    if (!score) return 'bg-gray-400';
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHealthStatusText = (score: number | null) => {
    if (!score) return 'Not assessed';
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  const getOperationStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'scheduled': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="crop-monitoring space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Crop Monitoring & Harvest</h3>
        <div className="flex space-x-2">
          <Dialog open={isObservationDialogOpen} onOpenChange={setIsObservationDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Add Observation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Crop Observation</DialogTitle>
              </DialogHeader>
              <ObservationForm 
                onSubmit={(data) => createObservationMutation.mutate(data)}
                isLoading={createObservationMutation.isPending}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={isHarvestDialogOpen} onOpenChange={setIsHarvestDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Record Harvest
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Harvest</DialogTitle>
              </DialogHeader>
              <HarvestForm 
                onSubmit={(data) => recordHarvestMutation.mutate(data)}
                isLoading={recordHarvestMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="observations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="observations">Observations ({observations?.length || 0})</TabsTrigger>
          <TabsTrigger value="operations">Operations ({operations?.length || 0})</TabsTrigger>
          <TabsTrigger value="harvest">Harvest ({harvests?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="observations" className="space-y-4">
          {observations?.map((obs) => (
            <Card key={obs.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{obs.field_name}</CardTitle>
                    <p className="text-sm text-gray-600">{obs.crop_variety_name}</p>
                  </div>
                  <Badge className={`${getHealthStatusColor(obs.health_score)} text-white`}>
                    {getHealthStatusText(obs.health_score)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Date:</span> {new Date(obs.observation_date).toLocaleDateString()}
                  </div>
                  {obs.growth_stage && (
                    <div>
                      <span className="font-medium">Stage:</span> {obs.growth_stage}
                    </div>
                  )}
                  {obs.plant_height_cm && (
                    <div>
                      <span className="font-medium">Height:</span> {obs.plant_height_cm} cm
                    </div>
                  )}
                  {obs.uniformity_score && (
                    <div>
                      <span className="font-medium">Uniformity:</span> {obs.uniformity_score}/10
                    </div>
                  )}
                </div>
                
                {(obs.pest_presence.length > 0 || obs.disease_presence.length > 0) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {obs.pest_presence.map((pest, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        Pest: {pest}
                      </Badge>
                    ))}
                    {obs.disease_presence.map((disease, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-red-500 text-red-600">
                        Disease: {disease}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {obs.notes && (
                  <div className="mt-3 text-sm text-gray-600">
                    <span className="font-medium">Notes:</span> {obs.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          )) || (
            <div className="text-center py-8 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No observations recorded yet</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsObservationDialogOpen(true)}
              >
                Record First Observation
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          {operations?.map((op) => (
            <Card key={op.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{op.operation_name}</h4>
                    <p className="text-sm text-gray-600">{op.field_name}</p>
                    <p className="text-sm">
                      Scheduled: {new Date(op.scheduled_date).toLocaleDateString()}
                      {op.completed_date && (
                        <span className="ml-4">
                          Completed: {new Date(op.completed_date).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getOperationStatusColor(op.status)} text-white`}>
                      {op.status.replace('_', ' ')}
                    </Badge>
                    {op.cost && (
                      <p className="text-sm text-gray-600 mt-1">${op.cost}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )) || (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No operations planned yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="harvest" className="space-y-4">
          {harvests?.map((harvest) => (
            <Card key={harvest.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{harvest.field_name}</h4>
                    <p className="text-sm text-gray-600">{harvest.crop_variety_name}</p>
                    <p className="text-sm">
                      {harvest.quantity_harvested} {harvest.unit}
                      {harvest.quality_grade && ` - ${harvest.quality_grade}`}
                    </p>
                    <p className="text-sm">
                      Date: {new Date(harvest.harvest_date).toLocaleDateString()}
                    </p>
                  </div>
                  {harvest.total_value && (
                    <div className="text-right">
                      <p className="font-medium text-green-600">${harvest.total_value.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )) || (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No harvest records yet</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsHarvestDialogOpen(true)}
              >
                Record First Harvest
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Observation Form Component
function ObservationForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit({
        observation_date: formData.get('observation_date'),
        growth_stage: formData.get('growth_stage'),
        plant_height_cm: parseFloat(formData.get('plant_height_cm') as string) || null,
        leaf_color: formData.get('leaf_color'),
        pest_presence: formData.get('pest_presence')?.toString().split(',').map(p => p.trim()).filter(Boolean) || [],
        disease_presence: formData.get('disease_presence')?.toString().split(',').map(d => d.trim()).filter(Boolean) || [],
        weed_pressure: formData.get('weed_pressure'),
        soil_moisture: formData.get('soil_moisture'),
        uniformity_score: parseInt(formData.get('uniformity_score') as string) || null,
        health_score: parseInt(formData.get('health_score') as string) || null,
        notes: formData.get('notes')
      });
    }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="observation_date">Observation Date</Label>
          <Input type="date" name="observation_date" required defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="growth_stage">Growth Stage</Label>
          <Select name="growth_stage">
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="germination">Germination</SelectItem>
              <SelectItem value="seedling">Seedling</SelectItem>
              <SelectItem value="vegetative">Vegetative</SelectItem>
              <SelectItem value="flowering">Flowering</SelectItem>
              <SelectItem value="fruiting">Fruiting</SelectItem>
              <SelectItem value="maturity">Maturity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="plant_height_cm">Plant Height (cm)</Label>
          <Input type="number" name="plant_height_cm" placeholder="Optional" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="leaf_color">Leaf Color</Label>
          <Select name="leaf_color">
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pale">Pale</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weed_pressure">Weed Pressure</Label>
          <Select name="weed_pressure">
            <SelectTrigger>
              <SelectValue placeholder="Select pressure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pest_presence">Pests (comma-separated)</Label>
          <Input name="pest_presence" placeholder="e.g., aphids, caterpillars" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="disease_presence">Diseases (comma-separated)</Label>
          <Input name="disease_presence" placeholder="e.g., blight, rust" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="uniformity_score">Uniformity (1-10)</Label>
          <Input type="number" name="uniformity_score" min="1" max="10" placeholder="1-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="health_score">Health Score (1-10)</Label>
          <Input type="number" name="health_score" min="1" max="10" placeholder="1-10" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea 
          name="notes" 
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Additional observations..."
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Recording...' : 'Record Observation'}
        </Button>
      </div>
    </form>
  );
}

// Harvest Form Component
function HarvestForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit({
        harvest_date: formData.get('harvest_date'),
        harvest_method: formData.get('harvest_method'),
        quantity_harvested: parseFloat(formData.get('quantity_harvested') as string),
        unit: formData.get('unit'),
        quality_grade: formData.get('quality_grade'),
        moisture_content: parseFloat(formData.get('moisture_content') as string) || null,
        price_per_unit: parseFloat(formData.get('price_per_unit') as string) || null,
        storage_location: formData.get('storage_location'),
        buyer_info: formData.get('buyer_info'),
        quality_notes: formData.get('quality_notes')
      });
    }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="harvest_date">Harvest Date</Label>
          <Input type="date" name="harvest_date" required defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="harvest_method">Harvest Method</Label>
          <Select name="harvest_method">
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="mechanical">Mechanical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity_harvested">Quantity</Label>
          <Input type="number" step="0.1" name="quantity_harvested" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select name="unit" required>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilograms</SelectItem>
              <SelectItem value="tons">Tons</SelectItem>
              <SelectItem value="bags">Bags</SelectItem>
              <SelectItem value="boxes">Boxes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quality_grade">Quality Grade</Label>
          <Select name="quality_grade">
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="grade_a">Grade A</SelectItem>
              <SelectItem value="grade_b">Grade B</SelectItem>
              <SelectItem value="reject">Reject</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price_per_unit">Price per Unit ($)</Label>
          <Input type="number" step="0.01" name="price_per_unit" placeholder="Optional" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="moisture_content">Moisture Content (%)</Label>
          <Input type="number" step="0.1" name="moisture_content" placeholder="Optional" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="storage_location">Storage Location</Label>
          <Input name="storage_location" placeholder="e.g., Storage barn A" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyer_info">Buyer Info</Label>
          <Input name="buyer_info" placeholder="Optional" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="quality_notes">Quality Notes</Label>
        <textarea 
          name="quality_notes" 
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Quality assessment notes..."
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Recording...' : 'Record Harvest'}
        </Button>
      </div>
    </form>
  );
}