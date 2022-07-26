import { Book } from "../entity/Book.entity";
import { User } from "../entity/User.entity";

require('dotenv').config();

export const dbconfig: any = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeoutMS: 5000,
    logging: false,
    entities: [Book, User],
    autoLoadEntities: true,
    synchronize: true,
    cli: {
        migrationsDir: "src/migration",
        entitiesDir: "src/entity"
    }
};