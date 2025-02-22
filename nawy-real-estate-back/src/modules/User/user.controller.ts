
import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import { asyncHandler } from "../../utils/errorHandling";

const userService = new UserService();

class UserController {

    static getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("User Id: " + req.headers.userId);
        
        const users = await userService.getAllUsers();
        res.json(users);
    });
    
    static getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    });

    static create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    })

    static update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    })

    static delete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    })
}

export default UserController;