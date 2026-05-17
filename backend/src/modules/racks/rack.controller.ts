import { Request, Response, NextFunction } from 'express';
import rackService from './rack.service';
import { createRackSchema, updateRackSchema } from './rack.schema';
import { ApiResponse } from '../../shared/types';

class RackController {
    async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const racks = await rackService.getAllRacks();
            const response: ApiResponse = {
                success: true,
                message: 'Racks retrieved successfully',
                data: racks,
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid rack ID',
                });
                return;
            }

            const rack = await rackService.getRackById(id);
            const response: ApiResponse = {
                success: true,
                message: 'Rack retrieved successfully',
                data: rack,
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validated = createRackSchema.parse(req.body);
            const rack = await rackService.createRack(validated);
            const response: ApiResponse = {
                success: true,
                message: 'Rack created successfully',
                data: rack,
            };
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid rack ID',
                });
                return;
            }

            const validated = updateRackSchema.parse(req.body);
            const rack = await rackService.updateRack(id, validated);
            const response: ApiResponse = {
                success: true,
                message: 'Rack updated successfully',
                data: rack,
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid rack ID',
                });
                return;
            }

            await rackService.deleteRack(id);
            const response: ApiResponse = {
                success: true,
                message: 'Rack deleted successfully',
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new RackController();