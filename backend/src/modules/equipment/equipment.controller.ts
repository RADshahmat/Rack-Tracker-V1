import { Request, Response, NextFunction } from 'express';
import equipmentService from './equipment.service';
import { createEquipmentSchema, updateEquipmentSchema } from './equipment.schema';
import { ApiResponse } from '../../shared/types';
import { UpdateEquipmentInput } from './equipment.types';

class EquipmentController {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

            // Validate pagination params
            if (page !== undefined && (isNaN(page) || page < 1)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid page parameter',
                });
                return;
            }
            if (limit !== undefined && (isNaN(limit) || limit < 1 || limit > 100)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid limit parameter (must be between 1 and 100)',
                });
                return;
            }

            const result = await equipmentService.getAllEquipment(page, limit);
            const response: ApiResponse = {
                success: true,
                message: 'Equipment retrieved successfully',
                data: result,
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
                    message: 'Invalid equipment ID',
                });
                return;
            }

            const equipment = await equipmentService.getEquipmentById(id);
            const response: ApiResponse = {
                success: true,
                message: 'Equipment retrieved successfully',
                data: equipment,
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validated = createEquipmentSchema.parse(req.body);
            const equipment = await equipmentService.createEquipment(validated);
            const response: ApiResponse = {
                success: true,
                message: 'Equipment created successfully',
                data: equipment,
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
                    message: 'Invalid equipment ID',
                });
                return;
            }

            const validated = updateEquipmentSchema.parse(req.body) as UpdateEquipmentInput;
            const equipment = await equipmentService.updateEquipment(id, validated);
            const response: ApiResponse = {
                success: true,
                message: 'Equipment updated successfully',
                data: equipment,
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
                    message: 'Invalid equipment ID',
                });
                return;
            }

            await equipmentService.deleteEquipment(id);
            const response: ApiResponse = {
                success: true,
                message: 'Equipment deleted successfully',
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getByRackId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const rackId = parseInt(req.params.rackId, 10);
            if (isNaN(rackId)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid rack ID',
                });
                return;
            }

            const equipment = await equipmentService.getEquipmentByRackId(rackId);
            const response: ApiResponse = {
                success: true,
                message: 'Rack equipment retrieved successfully',
                data: equipment,
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new EquipmentController();