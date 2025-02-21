import { Request, Response, NextFunction } from "express";
import PropertyService from "./property.service";
import { asyncHandler } from "../../utils/errorHandling";

const propertyService = new PropertyService();
class PropertyController {

    static getAllProperties = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const properties = await propertyService.getAll();
        res.json(properties);
    })

    static getPropertyById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const property = await propertyService.getById(req.params.id);
        res.json(property);
    })

    static createProperty = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const property = await propertyService.create(req.body);
        res.status(201).json(property);
    })

    static updateProperty = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const updatedProperty = await propertyService.update(req.params.id, req.body);
        res.json(updatedProperty);
    })

    static deleteProperty = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await propertyService.delete(req.params.id);
        res.status(204).send();
    })
}

export default PropertyController;