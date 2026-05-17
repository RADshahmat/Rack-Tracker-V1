import apiClient from '@/shared/api/client';
import {
    ApiResponse,
    Equipment,
    CreateEquipmentInput,
    UpdateEquipmentInput,
    PaginatedResponse,
} from '@/shared/types/api.types';

export const equipmentApi = {
    getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Equipment>> => {
        const response = await apiClient.get<ApiResponse<PaginatedResponse<Equipment>>>(
            `/api/equipment?page=${page}&limit=${limit}`
        );
        return response.data.data || { data: [], pagination: { page, limit, total: 0, totalPages: 0 } };
    },

    getById: async (id: number): Promise<Equipment> => {
        const response = await apiClient.get<ApiResponse<Equipment>>(`/api/equipment/${id}`);
        if (!response.data.data) throw new Error('Equipment not found');
        return response.data.data;
    },

    create: async (data: CreateEquipmentInput): Promise<Equipment> => {
        const response = await apiClient.post<ApiResponse<Equipment>>('/api/equipment', data);
        if (!response.data.data) throw new Error('Failed to create equipment');
        return response.data.data;
    },

    update: async (id: number, data: UpdateEquipmentInput): Promise<Equipment> => {
        const response = await apiClient.put<ApiResponse<Equipment>>(`/api/equipment/${id}`, data);
        if (!response.data.data) throw new Error('Failed to update equipment');
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/api/equipment/${id}`);
    },
};