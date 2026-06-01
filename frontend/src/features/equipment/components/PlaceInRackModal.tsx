import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Equipment, Rack } from '@/types';
import { useRacks } from '@/features/racks/hooks/useRacks';
import { useRackSlots, useUpdateEquipment } from '../hooks/useEquipment';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PlaceInRackModalProps {
  equipment: Equipment;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PlaceInRackModal({ equipment, onClose, onSuccess }: PlaceInRackModalProps) {
  const [selectedRackId, setSelectedRackId] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const { data: racksData } = useRacks();
  const { data: slotsData, isLoading: slotsLoading } = useRackSlots(selectedRackId);
  const { mutateAsync: updateEquipment, isPending } = useUpdateEquipment();

  const racks = racksData?.data || [];
  const slots = slotsData?.data;

  const handlePlaceInRack = async () => {
    if (!selectedRackId || selectedSlot === null) {
      toast.error('Please select both a rack and a slot');
      return;
    }

    try {
      await updateEquipment({
        id: equipment.id,
        data: {
          rack_id: selectedRackId,
          slot_position: selectedSlot,
        },
      });
      toast.success('Equipment placed in rack successfully');
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error('Failed to place equipment in rack');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-dark-border flex items-center justify-between shrink-0">
          <h3 className="font-semibold text-gray-900 dark:text-white">Place Equipment in Rack</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-dark-border rounded transition-colors"
          >
            <X size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Equipment: <span className="text-gray-900 dark:text-white">{equipment.tag}</span>
            </p>
          </div>

          {/* Rack Selection */}
          <div>
            <Label htmlFor="rack-select">Select Rack *</Label>
            <select
              id="rack-select"
              value={selectedRackId || ''}
              onChange={(e) => {
                setSelectedRackId(e.target.value ? Number(e.target.value) : null);
                setSelectedSlot(null); // Reset slot when rack changes
              }}
              className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-sky-500 mt-1"
            >
              <option value="">Choose a rack</option>
              {racks.map((rack: Rack) => (
                <option key={rack.id} value={rack.id}>
                  {rack.tag} - {rack.name}
                </option>
              ))}
            </select>
          </div>

          {/* Slot Selection */}
          {selectedRackId && (
            <div>
              <Label htmlFor="slot-select">
                Select Slot *
                {slotsLoading && <Loader2 className="inline ml-1 w-3 h-3 animate-spin" />}
              </Label>
              {slots ? (
                <>
                  <select
                    id="slot-select"
                    value={selectedSlot || ''}
                    onChange={(e) => setSelectedSlot(e.target.value ? Number(e.target.value) : null)}
                    disabled={slotsLoading}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-sky-500 mt-1 disabled:opacity-60"
                  >
                    <option value="">Choose a slot</option>
                    {slots.available?.map((slot) => (
                      <option key={slot} value={slot}>
                        Slot {slot}U
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Available: {slots.availableCount} | Occupied: {slots.occupiedCount} of {slots.total}
                  </p>
                </>
              ) : (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">Failed to load slots</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-dark-border flex gap-2 justify-end shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePlaceInRack}
            disabled={isPending || !selectedRackId || selectedSlot === null}
          >
            {isPending ? 'Placing...' : 'Place Equipment'}
          </Button>
        </div>
      </div>
    </div>
  );
}
