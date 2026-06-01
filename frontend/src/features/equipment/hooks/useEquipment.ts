import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { equipmentApi } from '../api';
import type { EquipmentFormInput } from '@/types/schemas';
import { queryKeys } from '@/api/queryKeys';

export const useEquipment = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: queryKeys.equipment.list(page, limit),
    queryFn: () => equipmentApi.getAll(page, limit),
  });
};

export const useEquipmentById = (id: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.equipment.detail(id!),
    queryFn: () => equipmentApi.getById(id!),
    enabled: !!id,
  });
};

export const useEquipmentByRackId = (rackId: number | undefined) => {
  return useQuery({
    queryKey: rackId ? queryKeys.equipment.byRack(rackId) : ['disabled'],
    queryFn: () => equipmentApi.getByRackId(rackId!),
    enabled: !!rackId,
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EquipmentFormInput) => equipmentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.equipment.all });
    },
  });
};

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<EquipmentFormInput> }) =>
      equipmentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.equipment.all });
    },
  });
};

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => equipmentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.equipment.all });
    },
  });
};

export const useRackSlots = (rackId: number | undefined | null) => {
  return useQuery({
    queryKey: rackId ? ['rackSlots', rackId] : ['disabled'],
    queryFn: () => equipmentApi.getRackSlots(rackId!),
    enabled: !!rackId,
  });
};
