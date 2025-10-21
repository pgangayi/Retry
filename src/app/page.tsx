export default function Home() {
  const modules = [
    {
      name: "Animals",
      description: "Manage livestock records, health tracking, and movement history",
      href: "/animals",
      status: "Fully Functional",
      color: "bg-green-100 text-green-800"
    },
    {
      name: "Crops",
      description: "Track crop cultivation, harvesting, and field management",
      href: "/crops",
      status: "Fully Functional",
      color: "bg-green-100 text-green-800"
    },
    {
      name: "Inventory",
      description: "Manage farm equipment, supplies, and asset tracking",
      href: "/inventory",
      status: "Basic UI Ready",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Sales",
      description: "Handle sales transactions, invoicing, and customer management",
      href: "/sales",
      status: "Basic UI Ready",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Knowledge Base",
      description: "Access farming guides, best practices, and educational resources",
      href: "/kb",
      status: "Basic UI Ready",
      color: "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Retry Farm ERP
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive farm management system with offline-first capabilities.
          Manage your livestock, crops, inventory, and sales all in one place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <div
            key={module.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {module.name}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${module.color}`}>
                {module.status}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              {module.description}
            </p>

            <a
              href={module.href}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
                module.status === "Fully Functional"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              {...(module.status !== "Fully Functional" && { "aria-disabled": "true" })}
            >
              {module.status === "Fully Functional" ? "Open Module" : "Coming Soon"}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Progressive Web App Features
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Installable on mobile and desktop devices</li>
                <li>Works offline with cached data</li>
                <li>Responsive design for all screen sizes</li>
                <li>Fast loading and background sync capabilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}