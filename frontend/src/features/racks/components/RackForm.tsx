import { useState, useEffect } from 'react';
import { CreateRackInput, Rack } from '@/shared/types/api.types';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface RackFormProps {
    rack?: Rack;
    onSubmit: (data: CreateRackInput) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
}

export default function RackForm({ rack, onSubmit, onCancel, isLoading }: RackFormProps) {
    const [formData, setFormData] = useState<CreateRackInput>({
        tag: '',
        name: '',
        location: '',
        capacity: 42,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (rack) {
            setFormData({
                tag: rack.tag,
                name: rack.name,
                location: rack.location || '',
                capacity: rack.capacity,
            });
        }
    }, [rack]);

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

        if (formData.capacity < 1 || formData.capacity > 100) {
            newErrors.capacity = 'Capacity must be between 1 and 100';
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
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{rack ? 'Edit Rack' : 'Create New Rack'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="tag">
                            Tag <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="tag"
                            value={formData.tag}
                            onChange={(e) => setFormData({ ...formData, tag: e.target.value.toUpperCase() })}
                            placeholder="RACK-A1"
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
                            placeholder="Production Rack A1"
                            className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Data Center - Row A"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity (U)</Label>
                        <Input
                            id="capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                            min="1"
                            max="100"
                            className={errors.capacity ? 'border-destructive' : ''}
                        />
                        {errors.capacity && <p className="text-sm text-destructive">{errors.capacity}</p>}
                    </div>
                </CardContent>

                <CardFooter className="gap-2">
                    <Button type="submit" disabled={isLoading} className="flex-1">
                        {isLoading ? 'Saving...' : rack ? 'Update Rack' : 'Create Rack'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                        Cancel
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}