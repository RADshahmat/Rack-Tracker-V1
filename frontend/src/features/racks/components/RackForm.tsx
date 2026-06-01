import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rack } from '@/types';
import { RackFormInput, rackSchema } from '@/types/schemas';
import { useUpdateRack, useCreateRack } from '../hooks/useRacks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormMessage } from '@/components/ui/form';
import { handleBackendErrors } from '@/utils/errorHandler';
import { toast } from 'sonner';

interface RackFormProps {
  rack?: Rack;
  onSuccess?: () => void;
  isLoading?: boolean;
}

export function RackForm({
  rack,
  onSuccess,
  isLoading = false,
}: RackFormProps) {
  const isEditing = !!rack;
  const updateRack = useUpdateRack();
  const createRack = useCreateRack();
  const mutation = isEditing ? updateRack : createRack;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RackFormInput>({
    resolver: zodResolver(rackSchema),
    defaultValues: rack
      ? {
          tag: rack.tag,
          name: rack.name,
          location: rack.location,
          capacity: rack.capacity,
        }
      : undefined,
  });

  const onSubmit = async (data: RackFormInput) => {
    try {
      if (isEditing && rack) {
        await updateRack.mutateAsync({
          id: rack.id,
          data,
        });
        toast.success('Rack updated successfully');
      } else {
        await createRack.mutateAsync(data);
        toast.success('Rack created successfully');
        reset();
      }
      onSuccess?.();
    } catch (error) {
      const errorMessage = handleBackendErrors(error, setError);
      toast.error(errorMessage);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField>
        <Label htmlFor="tag">Tag *</Label>
        <Input
          id="tag"
          placeholder="e.g., Rack-1"
          disabled={isSubmitting || isLoading}
          {...register('tag')}
        />
        {errors.tag && <FormMessage>{errors.tag.message}</FormMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          placeholder="e.g., Main Server Rack"
          disabled={isSubmitting || isLoading}
          {...register('name')}
        />
        {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          placeholder="e.g., DataCenter A, Row 1"
          disabled={isSubmitting || isLoading}
          {...register('location')}
        />
        {errors.location && <FormMessage>{errors.location.message}</FormMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="capacity">Capacity (U) *</Label>
        <Input
          id="capacity"
          type="number"
          placeholder="e.g., 42"
          disabled={isSubmitting || isLoading}
          {...register('capacity', { valueAsNumber: true })}
        />
        {errors.capacity && <FormMessage>{errors.capacity.message}</FormMessage>}
      </FormField>

      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || isLoading || mutation.isPending}
        >
          {isSubmitting || mutation.isPending ? 'Saving...' : isEditing ? 'Update Rack' : 'Create Rack'}
        </Button>
      </div>
    </Form>
  );
}
