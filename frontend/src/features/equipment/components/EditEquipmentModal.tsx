import { useState } from 'react';
import { Equipment } from '@/types';
import { FormModal } from '@/components/common/FormModal';
import { EquipmentForm } from './EquipmentForm';

interface EditEquipmentModalProps {
  equipment: Equipment;
  onClose: () => void;
}

export function EditEquipmentModal({ equipment, onClose }: EditEquipmentModalProps) {
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
      title="Edit Equipment"
      description={`Edit details for ${equipment.name}`}
    >
      <EquipmentForm
        equipment={equipment}
        onSuccess={() => handleOpenChange(false)}
      />
    </FormModal>
  );
}

