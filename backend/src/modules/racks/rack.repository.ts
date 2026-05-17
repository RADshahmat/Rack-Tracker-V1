import { Pool } from 'pg';
import db from '../../shared/db';
import { Rack, CreateRackInput, UpdateRackInput } from './rack.types';

export interface IRackRepository {
    findAll(): Promise<Rack[]>;
    findById(id: number): Promise<Rack | null>;
    findByTag(tag: string): Promise<Rack | null>;
    create(data: CreateRackInput): Promise<Rack>;
    update(id: number, data: UpdateRackInput): Promise<Rack | null>;
    delete(id: number): Promise<boolean>;
}

class RackRepository implements IRackRepository {
    private pool: Pool;

    constructor() {
        this.pool = db.getPool();
    }

    async findAll(): Promise<Rack[]> {
        const query = `
      SELECT id, tag, name, location, capacity, created_at, updated_at
      FROM racks
      ORDER BY created_at DESC
    `;
        const result = await this.pool.query(query);
        return result.rows;
    }

    async findById(id: number): Promise<Rack | null> {
        const query = `
      SELECT id, tag, name, location, capacity, created_at, updated_at
      FROM racks
      WHERE id = $1
    `;
        const result = await this.pool.query(query, [id]);
        return result.rows[0] || null;
    }

    async findByTag(tag: string): Promise<Rack | null> {
        const query = `
      SELECT id, tag, name, location, capacity, created_at, updated_at
      FROM racks
      WHERE tag = $1
    `;
        const result = await this.pool.query(query, [tag]);
        return result.rows[0] || null;
    }

    async create(data: CreateRackInput): Promise<Rack> {
        const query = `
      INSERT INTO racks (tag, name, location, capacity)
      VALUES ($1, $2, $3, $4)
      RETURNING id, tag, name, location, capacity, created_at, updated_at
    `;
        const values = [
            data.tag,
            data.name,
            data.location || null,
            data.capacity || 42,
        ];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async update(id: number, data: UpdateRackInput): Promise<Rack | null> {
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
        if (data.location !== undefined) {
            fields.push(`location = $${paramCount++}`);
            values.push(data.location);
        }
        if (data.capacity !== undefined) {
            fields.push(`capacity = $${paramCount++}`);
            values.push(data.capacity);
        }

        fields.push(`updated_at = NOW()`);
        values.push(id);

        const query = `
      UPDATE racks
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, tag, name, location, capacity, created_at, updated_at
    `;

        const result = await this.pool.query(query, values);
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM racks WHERE id = $1`;
        const result = await this.pool.query(query, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}

export default new RackRepository();