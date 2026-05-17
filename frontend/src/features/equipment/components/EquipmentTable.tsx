import type { Equipment } from '@/shared/types/api.types';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Table,TableBody,TableCell, TableHead,TableHeader, TableRow} from '@/shared/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

interface EquipmentTableProps {
    equipment: Equipment[];
    onEdit: (equipment: Equipment) => void;
    onDelete: (id: number) => void;
}

export default function EquipmentTable({ equipment, onEdit, onDelete }: EquipmentTableProps) {
    const handleDelete = (item: Equipment) => {
        if (confirm(`Are you sure you want to delete equipment ${item.tag}?`)) {
            onDelete(item.id);
        }
    };

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tag</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Rack</TableHead>
                        <TableHead>Slot</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {equipment.length === 0 ? (
                        <TableRow>
                            <TableCell  className="text-center text-muted-foreground">
                                No equipment found
                            </TableCell>
                        </TableRow>
                    ) : (
                        equipment.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.tag}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    {item.type ? (
                                        <Badge variant="secondary">{item.type}</Badge>
                                    ) : (
                                        <span className="text-muted-foreground">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {item.rack_id ? (
                                        <span className="text-sm">Rack #{item.rack_id}</span>
                                    ) : (
                                        <span className="text-muted-foreground">Unassigned</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {item.slot_position ? (
                                        <span className="text-sm">U{item.slot_position}</span>
                                    ) : (
                                        <span className="text-muted-foreground">-</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}