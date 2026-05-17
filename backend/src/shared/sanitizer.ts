import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to trim all string values in request body
 * Helps prevent whitespace-related validation issues
 */
export const bodySanitizer = (req: Request, _res: Response, next: NextFunction): void => {
    if (req.body && typeof req.body === 'object') {
        Object.keys(req.body).forEach((key) => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].trim();
            }
        });
    }
    next();
};