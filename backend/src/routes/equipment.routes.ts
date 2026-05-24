import { Router } from 'express';
import equipmentController from '../modules/equipment/equipment.controller';

const router = Router();

router.get('/', equipmentController.getAll.bind(equipmentController));
router.get('/:id', equipmentController.getById.bind(equipmentController));
router.post('/', equipmentController.create.bind(equipmentController));
router.put('/:id', equipmentController.update.bind(equipmentController));
router.delete('/:id', equipmentController.delete.bind(equipmentController));
router.get('/rack/:rackId', equipmentController.getByRackId.bind(equipmentController));

export default router;