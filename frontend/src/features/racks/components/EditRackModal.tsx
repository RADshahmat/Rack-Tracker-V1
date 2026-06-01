import { useState } from 'react';
import type { Rack } from '@/types';
import { FormModal } from '@/components/common/FormModal';
import { RackForm } from './RackForm';

interface EditRackModalProps {
  rack: Rack;
  onClose: () => void;
}

export function EditRackModal({ rack, onClose }: EditRackModalProps) {
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
      title="Edit Rack"
      description="Update rack information"
    >
      <RackForm rack={rack} onSuccess={() => handleOpenChange(false)} />
    </FormModal>
  );
}
