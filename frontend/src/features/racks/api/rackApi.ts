import apiClient from '../../../shared/api/client';
import type {ApiResponse,Rack,CreateRackInput, UpdateRackInput} from '../../../shared/types/api.types';

export const rackApi = {
    getAll: async (): Promise<Rack[]> => {
        const response = await apiClient.get<ApiResponse<Rack[]>>('/api/racks');
        return response.data.data || [];
    },

    getById: async (id: number): Promise<Rack> => {
        const response = await apiClient.get<ApiResponse<Rack>>(`/api/racks/${id}`);
        if (!response.data.data) throw new Error('Rack not found');
        return response.data.data;
    },

    create: async (data: CreateRackInput): Promise<Rack> => {
        const response = await apiClient.post<ApiResponse<Rack>>('/api/racks', data);
        if (!response.data.data) throw new Error('Failed to create rack');
        return response.data.data;
    },

    update: async (id: number, data: UpdateRackInput): Promise<Rack> => {
        const response = await apiClient.put<ApiResponse<Rack>>(`/api/racks/${id}`, data);
        if (!response.data.data) throw new Error('Failed to update rack');
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/api/racks/${id}`);
    },
};