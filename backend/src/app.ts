import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { requestLogger } from './shared/logger';
import { errorHandler } from './shared/errorHandler';
import { bodySanitizer } from './shared/sanitizer';
import rackController from './modules/racks/rack.controller';
import equipmentController from './modules/equipment/equipment.controller';
import db from './shared/db';

const app: Application = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(bodySanitizer);

// Health check endpoint
app.get('/healthz', async (req: Request, res: Response) => {
    const dbHealthy = await db.healthCheck();
    const status = dbHealthy ? 200 : 503;
    res.status(status).json({
        status: dbHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        database: dbHealthy ? 'connected' : 'disconnected',
    });
});

// Racks routes
app.get('/api/racks', rackController.getAll.bind(rackController));
app.get('/api/racks/:id', rackController.getById.bind(rackController));
app.post('/api/racks', rackController.create.bind(rackController));
app.put('/api/racks/:id', rackController.update.bind(rackController));
app.delete('/api/racks/:id', rackController.delete.bind(rackController));

// Equipment routes
app.get('/api/equipment', equipmentController.getAll.bind(equipmentController));
app.get('/api/equipment/:id', equipmentController.getById.bind(equipmentController));
app.post('/api/equipment', equipmentController.create.bind(equipmentController));
app.put('/api/equipment/:id', equipmentController.update.bind(equipmentController));
app.delete('/api/equipment/:id', equipmentController.delete.bind(equipmentController));

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;