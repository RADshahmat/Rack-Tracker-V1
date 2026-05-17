import { Rack } from '@/shared/types/api.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { MapPin, Pencil, Trash2 } from 'lucide-react';

interface RackCardProps {
    rack: Rack;
    onEdit: (rack: Rack) => void;
    onDelete: (id: number) => void;
}

export default function RackCard({ rack, onEdit, onDelete }: RackCardProps) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete rack ${rack.tag}?`)) {
            onDelete(rack.id);
        }
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <CardTitle>{rack.tag}</CardTitle>
                        <p className="text-sm text-muted-foreground">{rack.name}</p>
                    </div>
                    <Badge variant="secondary">{rack.capacity}U</Badge>
                </div>
            </CardHeader>

            <CardContent>
                {rack.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{rack.location}</span>
                    </div>
                )}
            </CardContent>

            <CardFooter className="gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(rack)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}