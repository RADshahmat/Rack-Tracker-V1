import { Router } from "express";
import rackRoutes from "./rack.routes";
import equipmentRoutes from "./equipment.routes";

const router = Router();

router.use("/racks", rackRoutes);
router.use("/equipment", equipmentRoutes);

export default router;