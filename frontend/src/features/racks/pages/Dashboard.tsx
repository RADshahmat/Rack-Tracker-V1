
export function Dashboard() {
  return (
    <div className="flex-1 overflow-auto">
  
      <main className="p-4 lg:p-8 bg-white dark:bg-dark-bg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Stats cards - Placeholder */}
          <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Racks</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">--</div>
          </div>
          <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Equipment Active</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">--</div>
          </div>
          <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Critical Alerts</div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-500 mt-2">--</div>
          </div>
          <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Warnings</div>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-500 mt-2">--</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metrics section - Placeholder */}
          <div className="lg:col-span-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Infrastructure Metrics</h3>
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              Metrics section (empty as requested)
            </div>
          </div>

          {/* Alerts section - Placeholder */}
          <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Alerts & Notifications</h3>
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              Alerts section (empty as requested)
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
