import { Router } from 'express';
import rackController from '../modules/racks/rack.controller';

const router = Router();

router.get('/', rackController.getAll.bind(rackController));
router.get('/:id', rackController.getById.bind(rackController));
router.get('/:id/slots', rackController.getSlots.bind(rackController));
router.post('/', rackController.create.bind(rackController));
router.put('/:id', rackController.update.bind(rackController));
router.delete('/:id', rackController.delete.bind(rackController));

export default router;