export interface Rack {
    id: number;
    tag: string;
    name: string;
    location: string | null;
    capacity: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateRackInput {
    tag: string;
    name: string;
    location?: string;
    capacity?: number;
}

export interface UpdateRackInput {
    tag?: string;
    name?: string;
    location?: string;
    capacity?: number;
}