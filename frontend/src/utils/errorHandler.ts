import type { UseFormSetError } from 'react-hook-form';

interface FieldError {
  field: string;
  message: string;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: FieldError[];
}

export function handleBackendErrors<T extends Record<string, any>>(
  error: unknown,
  setError: UseFormSetError<T>
): string {
  try {
    // Handle fetch/TanStack Query errors
    const errorData = error as ApiErrorResponse;

    // Map field-level errors
    if (errorData?.errors && Array.isArray(errorData.errors)) {
      errorData.errors.forEach((err) => {
        setError(err.field as any, {
          type: 'manual',
          message: err.message,
        });
      });
    }

    // Return general message
    return errorData?.message || 'An error occurred';
  } catch {
    return 'An error occurred';
  }
}

