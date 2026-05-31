import rackRepository, { IRackRepository } from './rack.repository';
import { Rack, CreateRackInput, UpdateRackInput } from './rack.types';
import { AppError } from '../../shared/errorHandler';

class RackService {
    private repository: IRackRepository;

    constructor(repository: IRackRepository) {
        this.repository = repository;
    }

    async getAllRacks(): Promise<Rack[]> {
        return await this.repository.findAll();
    }

    async getRackById(id: number): Promise<Rack> {
        const rack = await this.repository.findById(id);
        if (!rack) {
            throw new AppError(404, `Rack with ID ${id} not found`);
        }
        return rack;
    }

    async getRackSlots(rackId: number): Promise<{
        total: number;
        occupied: number[];
        available: number[];
        occupiedCount: number;
        availableCount: number;
    }> {
        const rack = await this.repository.findById(rackId);
        if (!rack) {
            throw new AppError(404, `Rack with ID ${rackId} not found`);
        }

        const occupiedSlots = await this.repository.findOccupiedSlots(rackId);

        const allSlots = Array.from({ length: rack.capacity }, (_, i) => i + 1);
        const occupiedSet = new Set(occupiedSlots);
        const availableSlots = allSlots.filter((slot) => !occupiedSet.has(slot));

        return {
            total: rack.capacity,
            occupied: occupiedSlots,
            available: availableSlots,
            occupiedCount: occupiedSlots.length,
            availableCount: availableSlots.length,
        };
    }

    async createRack(data: CreateRackInput): Promise<Rack> {
        // Check for duplicate tag
        const existing = await this.repository.findByTag(data.tag);
        if (existing) {
            throw new AppError(400, 'Tag already exists', [
                { field: 'tag', message: `A rack with tag "${data.tag}" already exists` },
            ]);
        }

        return await this.repository.create(data);
    }

    async updateRack(id: number, data: UpdateRackInput): Promise<Rack> {
        // Check if rack exists
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new AppError(404, `Rack with ID ${id} not found`);
        }

        // Check for duplicate tag if updating tag
        if (data.tag && data.tag !== existing.tag) {
            const tagExists = await this.repository.findByTag(data.tag);
            if (tagExists) {
                throw new AppError(400, 'Tag already exists', [
                    { field: 'tag', message: `A rack with tag "${data.tag}" already exists` },
                ]);
            }
        }

        const updated = await this.repository.update(id, data);
        if (!updated) {
            throw new AppError(500, 'Failed to update rack');
        }
        return updated;
    }

    async deleteRack(id: number): Promise<void> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new AppError(404, `Rack with ID ${id} not found`);
        }

        const deleted = await this.repository.delete(id);
        if (!deleted) {
            throw new AppError(500, 'Failed to delete rack');
        }
    }
}

export default new RackService(rackRepository);