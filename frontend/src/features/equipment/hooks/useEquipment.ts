import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { equipmentApi } from '../api/equipmentApi';
import { queryKeys } from '@/shared/api/queryKeys';
import { CreateEquipmentInput, UpdateEquipmentInput } from '@/shared/types/api.types';

export const useEquipment = (page = 1, limit = 10) => {
    const queryClient = useQueryClient();

    const equipmentQuery = useQuery({
        queryKey: queryKeys.equipment.list(page, limit),
        queryFn: () => equipmentApi.getAll(page, limit),
    });

    const createEquipmentMutation = useMutation({
        mutationFn: equipmentApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.equipment.lists() });
        },
    });

    const updateEquipmentMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateEquipmentInput }) =>
            equipmentApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.equipment.lists() });
        },
    });

    const deleteEquipmentMutation = useMutation({
        mutationFn: equipmentApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.equipment.lists() });
        },
    });

    return {
        equipment: equipmentQuery.data?.data || [],
        pagination: equipmentQuery.data?.pagination,
        isLoading: equipmentQuery.isLoading,
        error: equipmentQuery.error,
        createEquipment: createEquipmentMutation.mutateAsync,
        updateEquipment: updateEquipmentMutation.mutateAsync,
        deleteEquipment: deleteEquipmentMutation.mutateAsync,
        isCreating: createEquipmentMutation.isPending,
        isUpdating: updateEquipmentMutation.isPending,
        isDeleting: deleteEquipmentMutation.isPending,
    };
};

export const useEquipmentItem = (id: number) => {
    return useQuery({
        queryKey: queryKeys.equipment.detail(id),
        queryFn: () => equipmentApi.getById(id),
        enabled: !!id,
    });
};