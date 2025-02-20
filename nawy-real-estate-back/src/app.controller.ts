import cors from 'cors';
import express, { Request, Response, Express } from 'express';
import "reflect-metadata";
import { AppDataSource } from '.';
import { User } from './modules/User/user.entity';


function initApp(app:Express) {

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Default Route
    app.get("/", (req:Request, res:Response) => {
        res.send("Welcome to the Node.js API with TypeScript!");
    });
    

    // test end point
    app.get("/users", async (req:Request, res:Response) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.status(200).json({ message: "Done", users });
    });

    app.all("*", (req:Request, res:Response) => {
        res.status(404).json({ message: "In-valid routing please check url" });
    });

}

export default initApp;