import { Request, Response, NextFunction } from "express";
import ProjectService from "./project.service";

const projectService = new ProjectService();
class ProjectController {

    static async getAllProjects(req: Request, res: Response, next: NextFunction) {
        const projects = await projectService.getAll();
        res.json(projects);
    }

    static async getProjectById(req: Request, res: Response, next: NextFunction) {
        const project = await projectService.getById(req.params.id);
        res.json(project);
    }

    static async createProject(req: Request, res: Response, next: NextFunction) {
        const project = await projectService.create(req.body);
        res.status(201).json(project);
    }

    static async updateProject(req: Request, res: Response, next: NextFunction) {
        const updatedProject = await projectService.update(req.params.id, req.body);
        res.json(updatedProject);
    }

    static async deleteProject(req: Request, res: Response, next: NextFunction) {
        await projectService.delete(req.params.id);
        res.status(204).send();
    }
}

export default ProjectController;