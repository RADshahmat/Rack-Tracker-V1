// Query key factory for centralized key management (D2 Exemplary requirement)
export const queryKeys = {
    racks: {
        all: ['racks'] as const,
        lists: () => [...queryKeys.racks.all, 'list'] as const,
        list: () => [...queryKeys.racks.lists()] as const,
        details: () => [...queryKeys.racks.all, 'detail'] as const,
        detail: (id: number) => [...queryKeys.racks.details(), id] as const,
    },
    equipment: {
        all: ['equipment'] as const,
        lists: () => [...queryKeys.equipment.all, 'list'] as const,
        list: (page?: number, limit?: number) =>
            [...queryKeys.equipment.lists(), { page, limit }] as const,
        details: () => [...queryKeys.equipment.all, 'detail'] as const,
        detail: (id: number) => [...queryKeys.equipment.details(), id] as const,
    },
};