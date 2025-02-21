import AppDataSource from "../../database/data-source";
import { Repository } from "typeorm";
import { Project } from "./project.entity";

class ProjectService {
    private projectRepository: Repository<Project>;
    constructor() {
        this.projectRepository = AppDataSource.getRepository(Project);
    }

    async getAll() {
        return this.projectRepository.find();
    }

    async getById(id: string) {
        return this.projectRepository.findOne({ where: { _id: id } });
    }

    async create(data: Partial<Project>) {
        const project = this.projectRepository.create(data);
        return this.projectRepository.save(project);
    }

    async update(id: string, data: Partial<Project>) {
        await this.projectRepository.update(id, data);
        return this.getById(id);
    }

    async delete(id: string) {
        return this.projectRepository.delete(id);
    }
}

export default ProjectService;