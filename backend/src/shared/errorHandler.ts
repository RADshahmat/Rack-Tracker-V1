import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiResponse } from './types';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public errors?: Array<{ field?: string; message: string }>
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', err);

    // Handle Zod validation errors
    if (err instanceof ZodError) {
        const response: ApiResponse = {
            success: false,
            message: 'Validation failed',
            errors: err.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        };
        res.status(400).json(response);
        return;
    }

    // Handle custom AppError
    if (err instanceof AppError) {
        const response: ApiResponse = {
            success: false,
            message: err.message,
            errors: err.errors,
        };
        res.status(err.statusCode).json(response);
        return;
    }

    // Handle database errors
    if (err.message.includes('duplicate key value')) {
        const response: ApiResponse = {
            success: false,
            message: 'A record with this unique identifier already exists',
            errors: [{ message: 'Duplicate entry detected' }],
        };
        res.status(409).json(response);
        return;
    }

    // Default error
    const response: ApiResponse = {
        success: false,
        message: 'Internal server error',
    };
    res.status(500).json(response);
};