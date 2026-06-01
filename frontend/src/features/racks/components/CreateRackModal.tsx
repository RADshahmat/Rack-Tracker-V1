import { useState } from 'react';
import { FormModal } from '@/components/common/FormModal';
import { RackForm } from './RackForm';

interface CreateRackModalProps {
  onClose: () => void;
}

export function CreateRackModal({ onClose }: CreateRackModalProps) {
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
      title="Create New Rack"
      description="Add a new server rack to the datacenter"
    >
      <RackForm onSuccess={() => handleOpenChange(false)} />
    </FormModal>
  );
}


