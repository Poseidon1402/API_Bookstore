require('dotenv').config();
import "reflect-metadata"
import { DataSource } from "typeorm"

export const BookStore: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeoutMS: 5000,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/entity/*.ts`]
});