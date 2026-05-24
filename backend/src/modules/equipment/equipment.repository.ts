import { Pool } from 'pg';
import db from '../../shared/db';
import { Equipment, CreateEquipmentInput, UpdateEquipmentInput } from './equipment.types';
import { PaginatedResponse } from '../../shared/types';

export interface IEquipmentRepository {
    findAll(page?: number, limit?: number): Promise<PaginatedResponse<Equipment>>;
    findById(id: number): Promise<Equipment | null>;
    findByRackId(rackId: number): Promise<Equipment[]>;
    findByTag(tag: string): Promise<Equipment | null>;
    create(data: CreateEquipmentInput): Promise<Equipment>;
    update(id: number, data: UpdateEquipmentInput): Promise<Equipment | null>;
    delete(id: number): Promise<boolean>;
}

class EquipmentRepository implements IEquipmentRepository {
    private pool: Pool;

    constructor() {
        this.pool = db.getPool();
    }

    async findAll(page = 1, limit = 10): Promise<PaginatedResponse<Equipment>> {
        const offset = (page - 1) * limit;

        // Get total count
        const countQuery = `SELECT COUNT(*) FROM equipment`;
        const countResult = await this.pool.query(countQuery);
        const total = parseInt(countResult.rows[0].count, 10);

        // Get paginated data
        const query = `
      SELECT id, tag, name, type, rack_id, slot_position, created_at, updated_at
      FROM equipment
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
        const result = await this.pool.query(query, [limit, offset]);

        return {
            data: result.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: number): Promise<Equipment | null> {
        const query = `
      SELECT id, tag, name, type, rack_id, slot_position, created_at, updated_at
      FROM equipment
      WHERE id = $1
    `;
        const result = await this.pool.query(query, [id]);
        return result.rows[0] || null;
    }

    async findByRackId(rackId: number): Promise<Equipment[]> {
        const query = `
    SELECT id, tag, name, type, rack_id, slot_position, created_at, updated_at
    FROM equipment
    WHERE rack_id = $1
    ORDER BY slot_position ASC NULLS LAST
  `;
        const result = await this.pool.query(query, [rackId]);
        return result.rows;
    }
    

    async findByTag(tag: string): Promise<Equipment | null> {
        const query = `
      SELECT id, tag, name, type, rack_id, slot_position, created_at, updated_at
      FROM equipment
      WHERE tag = $1
    `;
        const result = await this.pool.query(query, [tag]);
        return result.rows[0] || null;
    }

    async create(data: CreateEquipmentInput): Promise<Equipment> {
        const query = `
      INSERT INTO equipment (tag, name, type, rack_id, slot_position)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, tag, name, type, rack_id, slot_position, created_at, updated_at
    `;
        const values = [
            data.tag,
            data.name,
            data.type || null,
            data.rack_id || null,
            data.slot_position || null,
        ];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async update(id: number, data: UpdateEquipmentInput): Promise<Equipment | null> {
        const fields: string[] = [];
        const values: unknown[] = [];
        let paramCount = 1;

        if (data.tag !== undefined) {
            fields.push(`tag = $${paramCount++}`);
            values.push(data.tag);
        }
        if (data.name !== undefined) {
            fields.push(`name = $${paramCount++}`);
            values.push(data.name);
        }
        if (data.type !== undefined) {
            fields.push(`type = $${paramCount++}`);
            values.push(data.type);
        }
        if (data.rack_id !== undefined) {
            fields.push(`rack_id = $${paramCount++}`);
            values.push(data.rack_id);
        }
        if (data.slot_position !== undefined) {
            fields.push(`slot_position = $${paramCount++}`);
            values.push(data.slot_position);
        }

        fields.push(`updated_at = NOW()`);
        values.push(id);

        const query = `
      UPDATE equipment
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, tag, name, type, rack_id, slot_position, created_at, updated_at
    `;

        const result = await this.pool.query(query, values);
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM equipment WHERE id = $1`;
        const result = await this.pool.query(query, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}

export default new EquipmentRepository();