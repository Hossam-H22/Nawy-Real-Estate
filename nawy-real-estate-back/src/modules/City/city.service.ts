import { City } from "./city.entity";
import AppDataSource from './../../database/data-source';
import { Repository } from "typeorm";
import { User } from "../User/user.entity";
import ApiFeatures from "../../utils/apiFeatures";

class CityService {
    private cityRepository: Repository<City>;
    private userRepository: Repository<User>;
    constructor() {
        this.cityRepository = AppDataSource.getRepository(City);
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getAll(query: any) {
        let queryBuilder = this.cityRepository.createQueryBuilder('city');
        const apiFeatures = new ApiFeatures(queryBuilder, 'city', query)
            .select()
            .filter()
            .sort()
            .paginate()
            .search();
        const cities = await apiFeatures['queryBuilder'].getMany();
        return { message: "Done", cities };
    }

    async getById(cityId: string, query: any) {
        query["_id"] = { "eq" : cityId };
        let queryBuilder = this.cityRepository.createQueryBuilder('city');
        const apiFeatures = new ApiFeatures(queryBuilder, 'city', query)
            .select()
            .filter()
        const city = await apiFeatures['queryBuilder'].getOne();
        return { message: "Done", city };
    }

    async create(userId: string, data: Partial<City>) {
        const user = await this.userRepository.findOneBy({_id: userId})
        data.createdBy = user as User;
        const city = this.cityRepository.create(data);
        return await this.cityRepository.save(city);
    }

    async update(cityId: string, data: Partial<City>) {
        const updateResult = await this.cityRepository.update(cityId, data);
        const city = await this.cityRepository.findOneBy({ _id: cityId })
        return { message: "Done", city };
    }

    // async delete(id: string) {
    //     return await this.cityRepository.delete(id);
    // }
}

export default CityService;