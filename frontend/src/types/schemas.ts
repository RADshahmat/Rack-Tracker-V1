import { z } from 'zod';

export const rackSchema = z.object({
  tag: z.string()
    .min(1, 'Tag is required')
    .max(50, 'Tag must be 50 characters or less')
    .regex(/^[A-Z0-9-]+$/, 'Tag must contain only uppercase letters, numbers, and hyphens'),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),
  location: z.string().max(100, 'Location must be 100 characters or less').optional().nullable(),
  capacity: z.number()
    .int()
    .min(1, 'Capacity must be at least 1')
    .max(100, 'Capacity must not exceed 100')
    .default(42),
});

export const equipmentSchema = z.object({
  tag: z.string()
    .min(1, 'Tag is required')
    .max(50, 'Tag must be 50 characters or less')
    .regex(/^[A-Z0-9-]+$/, 'Tag must contain only uppercase letters, numbers, and hyphens'),

  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),

  type: z.string()
    .max(50, 'Type must be 50 characters or less')
    .optional()
    .nullable(),

  status: z.enum(['STABLE', 'WARNING', 'CRITICAL'])
    .optional()
    .nullable(),

  model: z.string()
    .max(100, 'Model must be 100 characters or less')
    .optional()
    .nullable(),

  serial_number: z.string()
    .max(100, 'Serial number must be 100 characters or less')
    .optional()
    .nullable(),

  height: z.number()
    .int()
    .min(1, 'Height must be at least 1U')
    .max(50, 'Height must not exceed 50U')
    .optional()
    .nullable(),

  rack_id: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? null : val),
    z.coerce.number().int().positive().nullable().optional()
  ),

  slot_position: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? null : val),
    z.coerce.number().int().min(1, 'Slot position must be at least 1').max(100).nullable().optional()
  ),
});
export type RackFormInput = z.infer<typeof rackSchema>;
export type EquipmentFormInput = z.infer<typeof equipmentSchema>;
