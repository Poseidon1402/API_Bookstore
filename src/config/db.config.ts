import { Book } from "../entity/Book.entity";

require('dotenv').config();

export const dbconfig: any = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeoutMS: 5000,
    synchronize: true,
    logging: false,
    entities: [ __dirname + '/../entity/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    cli: {
        migrationsDir: "src/migration",
        entitiesDir: "src/entity"
    }
};