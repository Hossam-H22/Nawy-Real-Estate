import cors from 'cors';
import { Request, Response } from 'express';


function initApp(app:any, express:any) {

    // Default Route
    app.get("/", (req:Request, res:Response) => {
        res.send("Welcome to the Node.js API with TypeScript!");
    });

    app.all("*", (req:Request, res:Response) => {
        res.status(404).json({ message: "In-valid routing please check url" });
    });

}

export default initApp;