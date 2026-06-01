import { useState } from 'react';
import { Plus, Search, Grid, Loader2 } from 'lucide-react';
import { useRacks } from '@/features/racks/hooks/useRacks';
import { Rack } from '@/types';
import { RackCard } from './RackCard';
import { CreateRackModal } from './CreateRackModal';

interface RacksListProps {
  onSelectRack?: (rack: Rack) => void;
}

export function RacksList({ onSelectRack }: RacksListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data, isLoading, error } = useRacks();

  const racks = data?.data || [];
  const filteredRacks = racks.filter(
    (rack) =>
      rack.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rack.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      {/* Header with search and create button */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border sticky top-0 z-10">
        <div className="p-4 lg:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Racks</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your infrastructure racks</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Create Rack
          </button>
        </div>

        {/* Search bar */}
        <div className="px-4 lg:px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search racks by tag or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-dark-border border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Racks grid */}
      <div className="p-4 lg:p-6 bg-white dark:bg-dark-bg">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="text-sky-600 dark:text-sky-500 animate-spin" size={32} />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-600 rounded-lg p-4 text-center">
            <p className="text-red-600 dark:text-red-400">Failed to load racks. Please try again.</p>
          </div>
        ) : filteredRacks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <Grid size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No racks found</p>
            <p className="text-sm">
              {searchTerm
                ? 'Try adjusting your search criteria'
                : 'Create your first rack to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRacks.map((rack) => (
              <RackCard
                key={rack.id}
                rack={rack}
                onClick={() => onSelectRack?.(rack)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create modal */}
      {showCreateModal && (
        <CreateRackModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
