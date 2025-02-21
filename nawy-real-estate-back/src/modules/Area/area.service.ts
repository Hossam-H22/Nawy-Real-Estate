import AppDataSource from "../../database/data-source";
import { Area } from "./area.entity";
import { Repository } from "typeorm";

class AreaService {
    private areaRepository: Repository<Area>;
    constructor() {
        this.areaRepository = AppDataSource.getRepository(Area);
    }

    async getAll() {
        return this.areaRepository.find();
    }

    async getById(id: string) {
        return this.areaRepository.findOne({ where: { _id: id } });
    }

    async create(data: Partial<Area>) {
        const area = this.areaRepository.create(data);
        return this.areaRepository.save(area);
    }

    async update(id: string, data: Partial<Area>) {
        await this.areaRepository.update(id, data);
        return this.getById(id);
    }

    async delete(id: string) {
        return this.areaRepository.delete(id);
    }
}

export default AreaService;