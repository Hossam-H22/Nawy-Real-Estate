import { City } from "./city.entity";
import AppDataSource from './../../database/data-source';
import { Repository } from "typeorm";

class CityService {
    private cityRepository: Repository<City>;
    constructor(){
        this.cityRepository = AppDataSource.getRepository(City);
    }

    async getAll() {
        return this.cityRepository.find();
    }

    async getById(id: string) {
        return this.cityRepository.findOne({ where: { _id: id } });
    }

    async create(data: Partial<City>) {
        const city = this.cityRepository.create(data);
        return this.cityRepository.save(city);
    }

    async update(id: string, data: Partial<City>) {
        await this.cityRepository.update(id, data);
        return this.getById(id);
    }

    async delete(id: string) {
        return this.cityRepository.delete(id);
    }
}

export default CityService;