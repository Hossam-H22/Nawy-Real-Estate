import { Request, Response, NextFunction } from "express";
import PropertyService from "./property.service";

const propertyService = new PropertyService();
class PropertyController {

    static async getAllProperties(req: Request, res: Response, next: NextFunction) {
        const properties = await propertyService.getAll();
        res.json(properties);
    }

    static async getPropertyById(req: Request, res: Response, next: NextFunction) {
        const property = await propertyService.getById(req.params.id);
        res.json(property);
    }

    static async createProperty(req: Request, res: Response, next: NextFunction) {
        const property = await propertyService.create(req.body);
        res.status(201).json(property);
    }

    static async updateProperty(req: Request, res: Response, next: NextFunction) {
        const updatedProperty = await propertyService.update(req.params.id, req.body);
        res.json(updatedProperty);
    }

    static async deleteProperty(req: Request, res: Response, next: NextFunction) {
        await propertyService.delete(req.params.id);
        res.status(204).send();
    }
}

export default PropertyController;