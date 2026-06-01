import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function MainLayout() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      {/* Sidebar */}
      <Sidebar isExpanded={isExpanded} />

      {/* Main content */}
      <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Page content */}
        <Outlet />
      </main>
    </div>
  );
}
