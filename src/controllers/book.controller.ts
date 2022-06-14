import { NextFunction, Request, Response } from "express";
import { BookStore } from "../data-source";
import { Book } from "../entity/Book.entity";

export class BookController{

    public static retrieveAllBooks(req: Request, res: Response, next: NextFunction): void {
        
        BookStore.getRepository(Book).find()
            .then(books => res.status(200).json(books))
            .catch(err => res.status(500).json(err));
    }
}