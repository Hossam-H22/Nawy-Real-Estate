import { RequestHandler, Router } from "express";
import PropertyController from "./property.controller";
import * as validators from "./property.validation"
import { validation } from "../../middleware/validation.middleware";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.get(
    "/", 
    PropertyController.getAllProperties
);

router.get(
    "/:propertyId",
    validation(validators.get) as RequestHandler,
    PropertyController.getPropertyById
);

router.post(
    "/", 
    auth(),
    validation(validators.create) as RequestHandler,
    PropertyController.createProperty
);

router.put(
    "/:propertyId", 
    auth(),
    validation(validators.update) as RequestHandler,
    PropertyController.updateProperty
);

// router.delete("/:propertyId", PropertyController.deleteProperty);

export default router;
