import { Plus, Loader2 } from 'lucide-react';
import { Rack, Equipment } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RackSlotsTable } from './RackSlotsTable';

interface RackDetailsProps {
  rack: Rack;
  equipment: Equipment[];
  isLoading: boolean;
  selectedEquipmentId?: number | null;
  onAddEquipment: (slotPosition?: number) => void;
  onSelectEquipment: (id: number) => void;
}

const statusColorMap: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
  STABLE: 'success',
  WARNING: 'warning',
  CRITICAL: 'destructive',
};

export function RackDetails({
  rack,
  equipment,
  isLoading,
  selectedEquipmentId,
  onAddEquipment,
  onSelectEquipment,
}: RackDetailsProps) {
  return (
    <div className="bg-white dark:bg-dark-surface flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-dark-border p-4 flex-shrink-0 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{rack.tag}</h3>
              <Badge variant="default">{rack.capacity}U</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{rack.name}</p>
          </div>
          <Button onClick={() => onAddEquipment()} size="sm" className="gap-2 flex-shrink-0">
            <Plus size={14} />
            Add Equipment
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Location</span>
            <p className="font-medium text-gray-900 dark:text-white">{rack.location || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Capacity</span>
            <p className="font-medium text-gray-900 dark:text-white">{rack.capacity} U</p>
          </div>
        </div>
      </div>

      {/* Slots Table */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="text-sky-600 dark:text-sky-500 animate-spin" size={24} />
          </div>
        ) : (
          <RackSlotsTable
            rack={rack}
            equipment={equipment}
            selectedEquipmentId={selectedEquipmentId}
            onSelectEquipment={(id) => onSelectEquipment(id)}
            onAssignSlot={(slot) => onAddEquipment(slot)}
          />
        )}
      </div>
    </div>
  );
}
