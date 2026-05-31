export interface Equipment {
    id: number;
    tag: string;
    name: string;
    type: string | null;
    rack_id: number | null;
    slot_position: number | null;
    created_at: Date;
    updated_at: Date;
}

export interface CreateEquipmentInput {
    tag: string;
    name: string;
    type?: string;
    rack_id?: number | null;
    slot_position?: number | null;
}

export interface UpdateEquipmentInput {
    tag?: string;
    name?: string;
    type?: string;
    rack_id?: number | null;
    slot_position?: number | null;
}