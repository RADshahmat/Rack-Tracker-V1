export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    errors?: Array<{ field?: string; message: string }>;
}

export interface Rack {
    id: number;
    tag: string;
    name: string;
    location: string | null;
    capacity: number;
    created_at: string;
    updated_at: string;
}

export interface Equipment {
    id: number;
    tag: string;
    name: string;
    type: string | null;
    rack_id: number | null;
    slot_position: number | null;
    created_at: string;
    updated_at: string;
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

export interface CreateEquipmentInput {
    tag: string;
    name: string;
    type?: string;
    rack_id?: number;
    slot_position?: number;
}

export interface UpdateEquipmentInput {
    tag?: string;
    name?: string;
    type?: string;
    rack_id?: number | null;
    slot_position?: number | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}