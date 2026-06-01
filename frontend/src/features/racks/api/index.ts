import { apiClient } from '@/api/client';
import type { Rack, ApiResponse } from '@/types/index';
import type { RackFormInput } from '@/types/schemas';

export const racksApi = {
  getAll: () =>
    apiClient.get<ApiResponse<Rack[]>>('/racks'),

  getById: (id: number) =>
    apiClient.get<ApiResponse<Rack>>(`/racks/${id}`),

  create: (data: RackFormInput) =>
    apiClient.post<ApiResponse<Rack>>('/racks', data),

  update: (id: number, data: Partial<RackFormInput>) =>
    apiClient.put<ApiResponse<Rack>>(`/racks/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<ApiResponse<void>>(`/racks/${id}`),
};
