import { NextFunction, Request, Response } from "express";
import { BookStore } from "../data-source";
import { Book } from "../entity/Book.entity";

export class BookOperation {

    public static async retrieveAllBooks(req: Request, res: Response, next: NextFunction): Promise<Response> {

        const books: Book[] = await BookStore.manager.find(Book);

        return res.status(200).json(books);
    }
}