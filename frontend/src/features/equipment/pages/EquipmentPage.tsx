import { useState } from 'react';
import { useEquipment, useDeleteEquipment } from '@/features/equipment/hooks/useEquipment';
import { EquipmentHeader } from '../components/EquipmentHeader';
import { EquipmentTable } from '../components/EquipmentTable';
import { EquipmentPreview } from '../components/EquipmentPreview';
import { CreateEquipmentModal } from '../components/CreateEquipmentModal';
import { EditEquipmentModal } from '../components/EditEquipmentModal';
import { Pagination } from '@/components/common/Pagination';
import { toast } from 'sonner';

export function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(null);
  const [editingEquipment, setEditingEquipment] = useState<any>(null);

  const { data, isLoading, error } = useEquipment(currentPage, 10);
  const { mutate: deleteEquipment } = useDeleteEquipment();

  const equipment = data?.data || [];
  const pagination = data?.pagination;

  const filteredEquipment = equipment.filter(
    (eq) => {
      // Search filter
      const matchesSearch =
        eq.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      let matchesStatus = true;
      if (filterStatus === 'assigned') {
        matchesStatus = !!eq.rack_id;
      } else if (filterStatus === 'unassigned') {
        matchesStatus = !eq.rack_id;
      }

      return matchesSearch && matchesStatus;
    }
  );

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure to delete this equipment?')) {
      deleteEquipment(id, {
        onSuccess: () => {
          toast.success('Equipment deleted successfully');
          if (selectedEquipmentId === id) setSelectedEquipmentId(null);
        },
        onError: () => {
          toast.error('Failed to delete equipment');
        },
      });
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left: Equipment Table Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <EquipmentHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onCreateNew={() => setShowCreateModal(true)}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />

        <div className="flex-1 overflow-auto">
          <EquipmentTable
            equipment={filteredEquipment}
            isLoading={isLoading}
            error={!!error}
            selectedEquipmentId={selectedEquipmentId}
            onSelectEquipment={setSelectedEquipmentId}
            onDelete={handleDelete}
          />
        </div>

        {pagination && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Right: Equipment Preview & Actions */}
      {selectedEquipmentId && (
        <EquipmentPreview
          equipmentId={selectedEquipmentId}
          onClose={() => setSelectedEquipmentId(null)}
        />
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateEquipmentModal onClose={() => setShowCreateModal(false)} />
      )}
      {editingEquipment && (
        <EditEquipmentModal
          equipment={editingEquipment}
          onClose={() => setEditingEquipment(null)}
        />
      )}
    </div>
  );
}

