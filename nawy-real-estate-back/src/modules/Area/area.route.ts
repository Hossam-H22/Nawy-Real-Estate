import { Router } from "express";
import AreaController from "./area.controller";

const router = Router();

router.get("/", AreaController.getAllAreas);
router.get("/:id", AreaController.getAreaById);
router.post("/", AreaController.createArea);
router.put("/:id", AreaController.updateArea);
router.delete("/:id", AreaController.deleteArea);

export default router;