import { NextFunction, Request, Response } from "express";
import { DeleteResult } from "typeorm";
import { BookStore } from "../data-source";
import { Book } from "../entity/Book.entity";

export class BookOperation {

    public static async retrieveAllBooks(req: Request, res: Response, next: NextFunction): Promise<Response> {

        const books: Book[] = await BookStore.manager.find(Book);

        return res.status(200).json(books);
    }

    public static async saveBook(req: Request, res: Response, next: NextFunction): Promise<Response> {

        await BookStore.manager.insert(Book, req.body);

        return res.status(201).json({
            message: 'The book was saved successfully',
        });
    }

    public static async removeBook(req: Request, res: Response, next: NextFunction): Promise<Response> {
        
        const book: DeleteResult = await BookStore.manager.delete(Book, {
            book_number: req.params.id
        })

        if(book.affected === 0)
            return res.status(400).json({
                message: 'Ressource Not Found',
                affected: book.affected
            });

        return res.status(200).json({
            message: 'The book was deleted successfully'
        });
    }
}