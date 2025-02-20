import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initApp from "./app.controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

initApp(app, express);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
