import AppDataSource from "../../database/data-source";
import ApiFeatures from "../../utils/apiFeatures";
import { CustomError } from "../../utils/errorHandling";
import { Project } from "../Project/project.entity";
import { User } from "../User/user.entity";
import { Property } from "./property.entity";
import { Repository } from "typeorm";

class PropertyService {
    private propertyRepository: Repository<Property>;
    private projectRepository: Repository<Project>;
    private userRepository: Repository<User>;

    constructor() {
        this.propertyRepository = AppDataSource.getRepository(Property);
        this.projectRepository = AppDataSource.getRepository(Project);
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getAll(query: any) {
        let queryBuilder = this.propertyRepository.createQueryBuilder('property');
        const apiFeatures = new ApiFeatures(queryBuilder, 'property', query)
            .select()
            .filter()
            .sort()
            .paginate()
            .search();
        const properties = await apiFeatures['queryBuilder'].getMany();
        return { message: "Done", properties };
    }

    async getById(propertyId: string, query: any) {
        query["_id"] = { "eq" : propertyId };
        let queryBuilder = this.propertyRepository.createQueryBuilder('property');
        const apiFeatures = new ApiFeatures(queryBuilder, 'property', query)
            .select()
            .filter()
        const property = await apiFeatures['queryBuilder'].getOne();
        return { message: "Done", property };
    }

    async create(userId: string, data: Partial<Property>) {
        const checkProject = await this.propertyRepository.findOneBy({name: data.name});
        if(checkProject && checkProject.name==data.name){
            throw new CustomError("Duplicated property name", 409);
        }
        const user = await this.userRepository.findOneBy({_id: userId});
        data.createdBy = user as User;
        const projectId: string = String(data.projectId);
        const project = await this.projectRepository.findOneBy({_id: projectId});
        if(!project){
            throw new CustomError("In-valid project id", 400);
        }
        data.projectId = project;
        
        const property = this.propertyRepository.create(data);
        const newProperty = await this.propertyRepository.save(property);
        return { message: "Done", property: newProperty };
    }

    async update(userId:string, userRole:string, propertyId: string, data: Partial<Property>) {
        const property = await this.propertyRepository.findOneBy({_id: propertyId});
        if(!property){
            throw new CustomError("In-valid property id", 400);
        }
        
        if(data.name){
            if(property.name == data.name){
                throw new CustomError("Sorry cannot update property with the same name", 400);
            }

            const checkProperty = await this.propertyRepository.findOneBy({name: data.name});
            if(checkProperty && checkProperty.name==data.name){
                throw new CustomError("Duplicated property name", 409);
            }
        }

        if(data.description && property.description == data.description){
            throw new CustomError("Sorry cannot update property with the same description", 400);
        }
        if(data.price && property.price == data.price){
            throw new CustomError("Sorry cannot update property with the same price", 400);
        }
        if(data.type && property.type == data.type){
            throw new CustomError("Sorry cannot update property with the same type", 400);
        }
        if(data.status && property.status == data.status){
            throw new CustomError("Sorry cannot update property with the same status", 400);
        }
        if(data.bedrooms && property.bedrooms == data.bedrooms){
            throw new CustomError("Sorry cannot update property with the same bedrooms", 400);
        }
        if(data.bathrooms && property.bathrooms == data.bathrooms){
            throw new CustomError("Sorry cannot update property with the same bathrooms", 400);
        }
        if(data.squareFeet && property.squareFeet == data.squareFeet){
            throw new CustomError("Sorry cannot update property with the same squareFeet", 400);
        }

        const projectId: string = String(data.projectId);
        if(projectId){            
            // if(project?.projectId?._id == projectId){
            //     throw new CustomError("Sorry cannot update project with the same project", 400);
            // }
            const project = await this.projectRepository.findOneBy({_id: projectId});
            if(!project){
                throw new CustomError("In-valid project id", 400);
            }
            data.projectId = project;
        }

        const updateResult = await this.propertyRepository.update(propertyId, data);
        const updatedProperty = await this.propertyRepository.findOneBy({ _id: propertyId })
        return { message: "Done", property: updatedProperty };
    }

    // async delete(id: string) {
    //     return this.propertyRepository.delete(id);
    // }
}

export default PropertyService;
