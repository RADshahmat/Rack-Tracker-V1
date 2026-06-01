import { useState } from 'react';
import { FormModal } from '@/components/common/FormModal';
import { EquipmentForm } from './EquipmentForm';

interface CreateEquipmentModalProps {
  onClose: () => void;
  rackId?: number;
  slotPosition?: number;
}

export function CreateEquipmentModal({ onClose, rackId, slotPosition }: CreateEquipmentModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
    setIsOpen(open);
  };

  return (
    <FormModal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Add Equipment"
      description="Add a new piece of equipment to the datacenter"
    >
      <EquipmentForm 
        onSuccess={() => handleOpenChange(false)}
        defaultRackId={rackId}
        defaultSlotPosition={slotPosition}
        isSlotLocked={!!slotPosition}
      />
    </FormModal>
  );
}


