import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    // synchronize: process.env.MOOD == "DEV" ? true : false,  // Set to false in production
    synchronize: true,  // Set to false in production
    logging: process.env.MOOD == "DEV" ? true : false,
    entities: ["src/**/**/*.entity.ts"],
    migrations: ["src/migration/**/*.ts"],
});

export default AppDataSource;