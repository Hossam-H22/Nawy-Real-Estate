import { Request, Response, NextFunction } from "express";
import AreaService from "./area.service";

const areaService = new AreaService();
class AreaController {

    static async getAllAreas(req: Request, res: Response, next: NextFunction) {
        const areas = await areaService.getAll();
        res.json(areas);
    }

    static async getAreaById(req: Request, res: Response, next: NextFunction) {
        const area = await areaService.getById(req.params.id);
        res.json(area);
    }

    static async createArea(req: Request, res: Response, next: NextFunction) {
        const area = await areaService.create(req.body);
        res.status(201).json(area);
    }

    static async updateArea(req: Request, res: Response, next: NextFunction) {
        const updatedArea = await areaService.update(req.params.id, req.body);
        res.json(updatedArea);
    }

    static async deleteArea(req: Request, res: Response, next: NextFunction) {
        await areaService.delete(req.params.id);
        res.status(204).send();
    }
}

export default AreaController;