import "reflect-metadata"
import { DataSource } from "typeorm"
import { dbconfig } from "./config/db.config";

export const BookStore: DataSource = new DataSource(dbconfig);