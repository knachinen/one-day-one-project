import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User"; // Correct path to User entity

// Use a singleton pattern for the DataSource
let AppDataSource: DataSource;

const initializeDataSource = async () => {
  if (AppDataSource && AppDataSource.isInitialized) {
    return AppDataSource;
  }

  AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10), // Specify radix for parseInt
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "pictory",
    synchronize: true, // For development, be careful in production
    logging: false,
    entities: [User], // Explicitly list the User entity
    // migrations: [], // No migrations needed for now in dev setup
    // subscribers: [],
  });

  await AppDataSource.initialize();
  console.log("Next.js TypeORM Data Source has been initialized!");
  return AppDataSource;
};

export default initializeDataSource;
