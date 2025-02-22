import { RequestHandler, Router } from "express";
import UserController from "./user.controller";
import * as validator from "./user.validation"
import { validation } from "../../middleware/validation.middleware";
import { auth } from "../../middleware/auth.middleware";
import { UserRole } from "./user.entity";

const router = Router();

router.get("/", auth(), UserController.getAll);
router.get("/:id", validation(validator.getUser) as RequestHandler, UserController.getById);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;
