import { z } from 'zod';

export const createRackSchema = z.object({
    tag: z
        .string()
        .min(1, 'Tag is required')
        .max(50, 'Tag must be 50 characters or less')
        .regex(/^[A-Z0-9-]+$/, 'Tag must contain only uppercase letters, numbers, and hyphens'),
    name: z
        .string()
        .min(1, 'Name is required')
        .max(100, 'Name must be 100 characters or less'),
    location: z
        .string()
        .max(100, 'Location must be 100 characters or less')
        .optional(),
    capacity: z
        .number()
        .int('Capacity must be an integer')
        .min(1, 'Capacity must be at least 1')
        .max(100, 'Capacity must be 100 or less')
        .optional()
        .default(42),
});

export const updateRackSchema = z.object({
    tag: z
        .string()
        .min(1, 'Tag cannot be empty')
        .max(50, 'Tag must be 50 characters or less')
        .regex(/^[A-Z0-9-]+$/, 'Tag must contain only uppercase letters, numbers, and hyphens')
        .optional(),
    name: z
        .string()
        .min(1, 'Name cannot be empty')
        .max(100, 'Name must be 100 characters or less')
        .optional(),
    location: z
        .string()
        .max(100, 'Location must be 100 characters or less')
        .optional(),
    capacity: z
        .number()
        .int('Capacity must be an integer')
        .min(1, 'Capacity must be at least 1')
        .max(100, 'Capacity must be 100 or less')
        .optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});

export type CreateRackSchema = z.infer<typeof createRackSchema>;
export type UpdateRackSchema = z.infer<typeof updateRackSchema>;