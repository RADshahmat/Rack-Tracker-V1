import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border sticky top-0 z-20">
      <div className="px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
            >
              <Menu size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide">
              GLOBAL DATACENTER INFRASTRUCTURE | REAL-TIME VISUALIZATION DASHBOARD
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 space-x-4 border-r border-gray-200 dark:border-dark-border pr-4">
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors">DASHBOARD</button>
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors">DATA</button>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors relative">
              <Bell size={20} className="text-gray-700 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors">
              <User size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

