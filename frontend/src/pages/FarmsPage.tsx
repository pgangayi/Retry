import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Tractor, MapPin, Plus, CheckCircle } from 'lucide-react';

interface Farm {
  id: string;
  name: string;
  location: string;
  area_hectares?: number;
  created_at: string;
}

export function FarmsPage() {
  const { getAuthHeaders, user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('onboarding_completed'));
  const [currentStep, setCurrentStep] = useState(0);
  const [showCreateFarm, setShowCreateFarm] = useState(false);
  const [newFarm, setNewFarm] = useState({ name: '', location: '', area_hectares: '' });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  const { data: farms, isLoading, error, refetch } = useQuery({
    queryKey: ['farms'],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/farms', {
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to fetch farms');
      }

      return response.json() as Promise<Farm[]>;
    }
  });

  const onboardingSteps = [
    {
      title: "Welcome to Farmers Boot!",
      description: "Let's get you started with managing your farm. First, you'll need to create your first farm.",
      action: "Create Your First Farm"
    },
    {
      title: "Farm Created!",
      description: "Great! Now you can add fields, animals, and manage tasks. Explore the navigation to see all features.",
      action: "Explore Features"
    }
  ];

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError('');

    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/farms', {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newFarm.name,
          location: newFarm.location,
          area_hectares: newFarm.area_hectares ? parseFloat(newFarm.area_hectares) : null
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create farm');
      }

      setNewFarm({ name: '', location: '', area_hectares: '' });
      setShowCreateFarm(false);
      refetch();

      if (showOnboarding && currentStep === 0) {
        setCurrentStep(1);
      }
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : 'Failed to create farm');
    } finally {
      setCreating(false);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Tractor className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your farms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Error loading farms: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Tractor className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Farmers Boot</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/farms" className="text-green-600 font-medium">Farms</Link>
                <Link to="/fields" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Fields</Link>
                <Link to="/animals" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Animals</Link>
                <Link to="/tasks" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Tasks</Link>
                <Link to="/inventory" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Inventory</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, {user?.email}</span>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Farms</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and monitor your agricultural operations</p>
          </div>
          <Dialog open={showCreateFarm} onOpenChange={setShowCreateFarm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Farm
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Farm</DialogTitle>
                <DialogDescription>
                  Add a new farm to start managing your agricultural operations.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateFarm} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farm-name">Farm Name</Label>
                  <Input
                    id="farm-name"
                    placeholder="Enter farm name"
                    value={newFarm.name}
                    onChange={(e) => setNewFarm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-location">Location</Label>
                  <Input
                    id="farm-location"
                    placeholder="Enter farm location"
                    value={newFarm.location}
                    onChange={(e) => setNewFarm(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-area">Area (Hectares) - Optional</Label>
                  <Input
                    id="farm-area"
                    type="number"
                    step="0.01"
                    placeholder="Enter area in hectares"
                    value={newFarm.area_hectares}
                    onChange={(e) => setNewFarm(prev => ({ ...prev, area_hectares: e.target.value }))}
                  />
                </div>
                {createError && (
                  <Alert variant="destructive">
                    <AlertDescription>{createError}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateFarm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating ? 'Creating...' : 'Create Farm'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Farms Grid */}
        {farms && farms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms.map((farm) => (
              <Card key={farm.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Tractor className="h-5 w-5 text-green-600" />
                    <span>{farm.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{farm.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {farm.area_hectares && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {farm.area_hectares} hectares
                    </p>
                  )}
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => window.location.href = `/fields?farmId=${farm.id}`}>
                      View Fields
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.location.href = `/animals?farmId=${farm.id}`}>
                      View Animals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Tractor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No farms yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first farm to get started with managing your agricultural operations.</p>
            <Button onClick={() => setShowCreateFarm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Farm
            </Button>
          </div>
        )}
      </main>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <Dialog open={showOnboarding} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{onboardingSteps[currentStep].title}</span>
              </DialogTitle>
              <DialogDescription>
                {onboardingSteps[currentStep].description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              {currentStep === 0 ? (
                <Button onClick={() => setShowCreateFarm(true)}>
                  {onboardingSteps[currentStep].action}
                </Button>
              ) : (
                <Button onClick={completeOnboarding}>
                  {onboardingSteps[currentStep].action}
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default FarmsPage;