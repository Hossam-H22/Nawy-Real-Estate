import AppDataSource from "../../database/data-source";
import { User } from "./user.entity";
import { Repository } from "typeorm";


// const userRepository = AppDataSource.getRepository(User);

class UserService {
    userRepository: Repository<User>;

    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async getUserById(id: string) {
        return await this.userRepository.findOneBy({ _id: id });
    }

    async createUser(data: Partial<User>) {
        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser);
    }

    async updateUser(id: string, data: Partial<User>) {
        const user = await this.userRepository.update(id, data);
        // return await this.userRepository.findOneBy({ _id: id });
        return user;
    }

    async deleteUser(id: string) {
        return await this.userRepository.delete(id);
    }
}

export default UserService;