import { useState } from 'react';
import { useRacks } from '../hooks/useRacks';
import RackCard from './RackCard';
import RackForm from './RackForm';
import type { Rack } from '@/shared/types/api.types';
import { Button } from '@/shared/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/shared/components/ui/use-toast';

export default function RackGrid() {
    const { racks, isLoading, createRack, updateRack, deleteRack, isCreating, isUpdating } = useRacks();
    const [showForm, setShowForm] = useState(false);
    const [editingRack, setEditingRack] = useState<Rack | undefined>();
    const { toast } = useToast();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (data: any) => {
        try {
            if (editingRack) {
                await updateRack({ id: editingRack.id, data });
                toast({
                    title: 'Success',
                    description: 'Rack updated successfully',
                });
            } else {
                await createRack(data);
                toast({
                    title: 'Success',
                    description: 'Rack created successfully',
                });
            }
            setShowForm(false);
            setEditingRack(undefined);
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
            await deleteRack(id);
            toast({
                title: 'Success',
                description: 'Rack deleted successfully',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete rack',
            });
        }
    };

    const handleEdit = (rack: Rack) => {
        setEditingRack(rack);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingRack(undefined);
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
                    <h1 className="text-3xl font-bold tracking-tight">Racks</h1>
                    <p className="text-muted-foreground">Manage your rack inventory</p>
                </div>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Rack
                    </Button>
                )}
            </div>

            {showForm && (
                <RackForm
                    rack={editingRack}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating || isUpdating}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {racks.map((rack) => (
                    <RackCard key={rack.id} rack={rack} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>

            {racks.length === 0 && !showForm && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">No racks found. Create your first rack to get started!</p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Rack
                    </Button>
                </div>
            )}
        </div>
    );
}