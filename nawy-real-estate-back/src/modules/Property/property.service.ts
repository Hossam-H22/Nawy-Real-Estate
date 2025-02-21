import AppDataSource from "../../database/data-source";
import { Property } from "./property.entity";
import { Repository } from "typeorm";

class PropertyService {
    private propertyRepository: Repository<Property>;
    constructor() {
        this.propertyRepository = AppDataSource.getRepository(Property);
    }

    async getAll() {
        return this.propertyRepository.find();
    }

    async getById(id: string) {
        return this.propertyRepository.findOne({ where: { _id: id } });
    }

    async create(data: Partial<Property>) {
        const property = this.propertyRepository.create(data);
        return this.propertyRepository.save(property);
    }

    async update(id: string, data: Partial<Property>) {
        await this.propertyRepository.update(id, data);
        return this.getById(id);
    }

    async delete(id: string) {
        return this.propertyRepository.delete(id);
    }
}

export default PropertyService;
