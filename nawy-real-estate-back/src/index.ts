import express from "express";
import dotenv from "dotenv";
import initApp from "./app.controller";
import connectDB from "./database/connection";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connection DB
export const AppDataSource = connectDB();
initApp(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
