import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { racksApi } from '../api';
import type { RackFormInput } from '@/types/schemas';
import { queryKeys } from '@/api/queryKeys';

export const useRacks = () => {
  return useQuery({
    queryKey: queryKeys.racks.list(),
    queryFn: () => racksApi.getAll(),
  });
};

export const useRackById = (id: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.racks.detail(id!),
    queryFn: () => racksApi.getById(id!),
    enabled: !!id,
  });
};

export const useCreateRack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RackFormInput) => racksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.racks.all });
    },
  });
};

export const useUpdateRack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<RackFormInput> }) =>
      racksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.racks.all });
    },
  });
};

export const useDeleteRack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => racksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.racks.all });
    },
  });
};
