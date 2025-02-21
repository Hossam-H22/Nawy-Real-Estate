import { Router } from "express";
import CityController from "./city.controller";

const router = Router();

router.get("/", CityController.getAllCities);
router.get("/:id", CityController.getCityById);
router.post("/", CityController.createCity);
router.put("/:id", CityController.updateCity);
router.delete("/:id", CityController.deleteCity);

export default router;
