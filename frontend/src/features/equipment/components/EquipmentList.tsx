import { useState } from 'react';
import { useEquipment } from '../hooks/useEquipment';
import EquipmentForm from './EquipmentForm';
import EquipmentTable from './EquipmentTable';
import type { Equipment } from '@/shared/types/api.types';
import { Button } from '@/shared/components/ui/button';
import { Plus, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/shared/components/ui/use-toast';

export default function EquipmentList() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const {
        equipment,
        pagination,
        isLoading,
        createEquipment,
        updateEquipment,
        deleteEquipment,
        isCreating,
        isUpdating,
    } = useEquipment(page, limit);

    const [showForm, setShowForm] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState<Equipment | undefined>();
    const { toast } = useToast();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (data: any) => {
        try {
            if (editingEquipment) {
                await updateEquipment({ id: editingEquipment.id, data });
                toast({
                    title: 'Success',
                    description: 'Equipment updated successfully',
                });
            } else {
                await createEquipment(data);
                toast({
                    title: 'Success',
                    description: 'Equipment created successfully',
                });
            }
            setShowForm(false);
            setEditingEquipment(undefined);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error instanceof Error ? error.message : 'An error occurred',
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteEquipment(id);
            toast({
                title: 'Success',
                description: 'Equipment deleted successfully',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete equipment',
            });
        }
    };

    const handleEdit = (equipment: Equipment) => {
        setEditingEquipment(equipment);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingEquipment(undefined);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Equipment</h1>
                    <p className="text-muted-foreground">Manage your equipment inventory</p>
                </div>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Equipment
                    </Button>
                )}
            </div>

            {showForm && (
                <EquipmentForm
                    equipment={editingEquipment}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating || isUpdating}
                />
            )}

            <EquipmentTable equipment={equipment} onEdit={handleEdit} onDelete={handleDelete} />

            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {equipment.length} of {pagination.total} equipment
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                            disabled={page === pagination.totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}

            {equipment.length === 0 && !showForm && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">
                        No equipment found. Create your first equipment to get started!
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Equipment
                    </Button>
                </div>
            )}
        </div>
    );
}