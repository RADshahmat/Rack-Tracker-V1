import { apiClient } from '@/api/client';
import type { Equipment, ApiResponse} from '@/types';
import type { EquipmentFormInput } from '@/types/schemas';

export interface RackSlotsResponse {
  total: number;
  occupied: number[];
  available: number[];
  occupiedCount: number;
  availableCount: number;
}

export const equipmentApi = {
  getAll: (page: number = 1, limit: number = 10) =>
    apiClient.get<ApiResponse<Equipment[]>>('/equipment', {
      params: { page, limit },
    }),

  getById: (id: number) =>
    apiClient.get<ApiResponse<Equipment>>(`/equipment/${id}`),

  getByRackId: (rackId: number) =>
    apiClient.get<ApiResponse<Equipment[]>>(`/equipment/rack/${rackId}`),

  getRackSlots: (rackId: number) =>
    apiClient.get<ApiResponse<RackSlotsResponse>>(`/racks/${rackId}/slots`),

  create: (data: EquipmentFormInput) =>
    apiClient.post<ApiResponse<Equipment>>('/equipment', data),

  update: (id: number, data: Partial<EquipmentFormInput>) =>
    apiClient.put<ApiResponse<Equipment>>(`/equipment/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<ApiResponse<void>>(`/equipment/${id}`),
};

