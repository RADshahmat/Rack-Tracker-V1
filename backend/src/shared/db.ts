import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        this.pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getPool(): Pool {
        return this.pool;
    }

    public async healthCheck(): Promise<boolean> {
        try {
            const result = await this.pool.query('SELECT NOW()');
            return !!result.rows[0];
        } catch (error) {
            console.error('Database health check failed:', error);
            return false;
        }
    }
}

export default Database.getInstance();