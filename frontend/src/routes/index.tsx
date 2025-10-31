import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Tractor, Sprout, Users, Package, CheckSquare, MapPin } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tractor className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Farmers Boot</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </nav>
            <div className="md:hidden">
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to Farmers Boot
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A comprehensive farm management platform designed to streamline your agricultural operations.
            Manage farms, fields, animals, tasks, and inventory all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Farm Management</CardTitle>
              <CardDescription>
                Organize and monitor your farms and fields with detailed mapping and tracking.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Sprout className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Animal Tracking</CardTitle>
              <CardDescription>
                Keep detailed records of your livestock, health treatments, and breeding cycles.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CheckSquare className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Task Management</CardTitle>
              <CardDescription>
                Schedule and track farm tasks, assign responsibilities, and monitor progress.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Package className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Inventory Control</CardTitle>
              <CardDescription>
                Manage supplies, equipment, and resources with automated low-stock alerts.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Coordinate with your team members and share farm data securely.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Tractor className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Offline Support</CardTitle>
              <CardDescription>
                Work offline in the field and sync data when connection is restored.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to transform your farm management?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of farmers who trust Farmers Boot for their daily operations.
          </p>
          <Link to="/signup">
            <Button size="lg">
              Start Your Free Account
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}