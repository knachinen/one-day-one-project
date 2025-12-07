import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "pictory",
    synchronize: true, // Be careful with this in production
    logging: false,
    entities: ["src/entity/**/*.ts"], // Use glob pattern for ts-node
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
})
