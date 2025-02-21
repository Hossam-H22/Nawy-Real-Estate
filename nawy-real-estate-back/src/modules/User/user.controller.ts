
import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";

const userService = new UserService();

class UserController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        const users = await userService.getAllUsers();
        res.json(users);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    }
}

export default UserController;