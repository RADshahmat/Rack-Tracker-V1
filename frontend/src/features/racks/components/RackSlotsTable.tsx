import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Equipment, Rack } from '@/types';

interface RackSlotsTableProps {
  rack: Rack;
  equipment: Equipment[];
  selectedEquipmentId?: number | null;
  onSelectEquipment?: (id: number) => void;
  onAssignSlot: (slotPosition: number) => void;
}

export function RackSlotsTable({ rack, equipment, selectedEquipmentId, onSelectEquipment, onAssignSlot }: RackSlotsTableProps) {
  // Create an array of all slots
  const allSlots = Array.from({ length: rack.capacity }, (_, i) => i + 1);
  
  // Create a map of occupied slots
  const occupiedSlots = new Map(
    equipment.map((eq) => [eq.slot_position, eq])
  );

  return (
    <div className="p-4 overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white dark:bg-dark-surface">
          <TableRow>
            <TableHead>Slot</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSlots.map((slot) => {
            const eq = occupiedSlots.get(slot);
            return (
              <TableRow 
                key={slot} 
                className={`transition-colors cursor-pointer ${eq ? 'hover:bg-gray-50 dark:hover:bg-dark-bg/50' : ''}`}
                onClick={() => eq && onSelectEquipment?.(eq.id)}
              >
                <TableCell className="font-mono font-semibold">{slot}U</TableCell>
                {eq ? (
                  <>
                    <TableCell className="font-medium">{eq.name}</TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {eq.type || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          eq.status === 'CRITICAL'
                            ? 'destructive'
                            : eq.status === 'WARNING'
                            ? 'secondary'
                            : 'default'
                        }
                        className="text-xs"
                      >
                        {eq.status || 'STABLE'}
                      </Badge>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell colSpan={3}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAssignSlot(slot);
                        }}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-0 h-auto font-normal"
                      >
                        Empty - Click to Assign
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
