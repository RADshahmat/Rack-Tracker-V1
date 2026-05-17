import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { rackApi } from '../api/rackApi';
import { queryKeys } from '../../../shared/api/queryKeys';
import type { UpdateRackInput } from '../../../shared/types/api.types';

export const useRacks = () => {
    const queryClient = useQueryClient();

    const racksQuery = useQuery({
        queryKey: queryKeys.racks.list(),
        queryFn: rackApi.getAll,
    });

    const createRackMutation = useMutation({
        mutationFn: rackApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.racks.lists() });
        },
    });

    const updateRackMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateRackInput }) =>
            rackApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.racks.lists() });
        },
    });

    const deleteRackMutation = useMutation({
        mutationFn: rackApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.racks.lists() });
        },
    });

    return {
        racks: racksQuery.data || [],
        isLoading: racksQuery.isLoading,
        error: racksQuery.error,
        createRack: createRackMutation.mutateAsync,
        updateRack: updateRackMutation.mutateAsync,
        deleteRack: deleteRackMutation.mutateAsync,
        isCreating: createRackMutation.isPending,
        isUpdating: updateRackMutation.isPending,
        isDeleting: deleteRackMutation.isPending,
    };
};

export const useRack = (id: number) => {
    return useQuery({
        queryKey: queryKeys.racks.detail(id),
        queryFn: () => rackApi.getById(id),
        enabled: !!id,
    });
};