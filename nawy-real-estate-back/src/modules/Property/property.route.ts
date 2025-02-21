import { Router } from "express";
import PropertyController from "./property.controller";

const router = Router();

router.get("/", PropertyController.getAllProperties);
router.get("/:id", PropertyController.getPropertyById);
router.post("/", PropertyController.createProperty);
router.put("/:id", PropertyController.updateProperty);
router.delete("/:id", PropertyController.deleteProperty);

export default router;
