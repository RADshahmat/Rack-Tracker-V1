import { useState } from 'react';
import type { CreateEquipmentInput, Equipment } from '@/shared/types/api.types';
import { useRacks } from '@/features/racks/hooks/useRacks';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/shared/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface EquipmentFormProps {
    equipment?: Equipment;
    onSubmit: (data: CreateEquipmentInput) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
}

export default function EquipmentForm({
    equipment,
    onSubmit,
    onCancel,
    isLoading,
}: EquipmentFormProps) {
    const { racks } = useRacks();
    const [formData, setFormData] = useState<CreateEquipmentInput>(() => ({
        tag: equipment?.tag || '',
        name: equipment?.name || '',
        type: equipment?.type || '',
        rack_id: equipment?.rack_id || undefined,
        slot_position: equipment?.slot_position || undefined,
    }));

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.tag.trim()) {
            newErrors.tag = 'Tag is required';
        } else if (!/^[A-Z0-9-]+$/.test(formData.tag)) {
            newErrors.tag = 'Tag must contain only uppercase letters, numbers, and hyphens';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (formData.slot_position && (formData.slot_position < 1 || formData.slot_position > 100)) {
            newErrors.slot_position = 'Slot position must be between 1 and 100';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await onSubmit(formData);
        } catch (error) {
            // Error handled by parent
            console.error('Error submitting equipment form:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{equipment ? 'Edit Equipment' : 'Create New Equipment'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tag">
                                Tag <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="tag"
                                value={formData.tag}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value.toUpperCase() })}
                                placeholder="SRV-001"
                                className={errors.tag ? 'border-destructive' : ''}
                            />
                            {errors.tag && <p className="text-sm text-destructive">{errors.tag}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Web Server 01"
                                className={errors.name ? 'border-destructive' : ''}
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            placeholder="server, switch, storage"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="rack_id">Rack</Label>
                            <Select
                                value={formData.rack_id?.toString()}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, rack_id: value ? parseInt(value) : undefined })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a rack" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No Rack</SelectItem>
                                    {racks.map((rack) => (
                                        <SelectItem key={rack.id} value={rack.id.toString()}>
                                            {rack.tag} - {rack.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slot_position">Slot Position (U)</Label>
                            <Input
                                id="slot_position"
                                type="number"
                                value={formData.slot_position || ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        slot_position: e.target.value ? parseInt(e.target.value) : undefined,
                                    })
                                }
                                placeholder="1-100"
                                min="1"
                                max="100"
                                className={errors.slot_position ? 'border-destructive' : ''}
                            />
                            {errors.slot_position && (
                                <p className="text-sm text-destructive">{errors.slot_position}</p>
                            )}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="gap-2">
                    <Button type="submit" disabled={isLoading} className="flex-1">
                        {isLoading ? 'Saving...' : equipment ? 'Update Equipment' : 'Create Equipment'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                        Cancel
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}