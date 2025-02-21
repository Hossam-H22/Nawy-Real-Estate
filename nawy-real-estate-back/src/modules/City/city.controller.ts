import { NextFunction, Request, Response } from "express";
import CityService from "./city.service";

const cityService = new CityService();

class CityController {

    static async getAllCities(req: Request, res: Response, next: NextFunction) {
        const cities = await cityService.getAll();
        res.json(cities);
    }

    static async getCityById(req: Request, res: Response, next: NextFunction) {
        const city = await cityService.getById(req.params.id);
        res.json(city);
    }

    static async createCity(req: Request, res: Response, next: NextFunction) {
        const city = await cityService.create(req.body);
        res.status(201).json(city);
    }

    static async updateCity(req: Request, res: Response, next: NextFunction) {
        const updatedCity = await cityService.update(req.params.id, req.body);
        res.json(updatedCity);
    }

    static async deleteCity(req: Request, res: Response, next: NextFunction) {
        await cityService.delete(req.params.id);
        res.status(204).send();
    }
}

export default CityController;