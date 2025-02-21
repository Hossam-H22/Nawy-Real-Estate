import { Request, Response, NextFunction } from "express";
import ProjectService from "./project.service";
import { asyncHandler } from "../../utils/errorHandling";

const projectService = new ProjectService();
class ProjectController {

    static getAllProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const projects = await projectService.getAll();
        res.json(projects);
    });

    static getProjectById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const project = await projectService.getById(req.params.id);
        res.json(project);
    });

    static createProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const project = await projectService.create(req.body);
        res.status(201).json(project);
    });

    static updateProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const updatedProject = await projectService.update(req.params.id, req.body);
        res.json(updatedProject);
    });

    static deleteProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await projectService.delete(req.params.id);
        res.status(204).send();
    });
}

export default ProjectController;