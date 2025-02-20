import "reflect-metadata";
import { DataSource } from "typeorm";

const connectDB = ()=>{

    const AppDataSource = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        database: process.env.DB_NAME,
        synchronize: process.env.MOOD == "DEV" ? true : false,  // Set to false in production
        logging: process.env.MOOD == "DEV" ? true : false,
        entities: ["src/**/**/*.entity.ts"],
        migrations: ["src/migration/**/*.ts"],
    });

    AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

    return AppDataSource;
}

export default connectDB;
