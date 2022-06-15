import { NextFunction, Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
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

    public static async modifyBookInfo(req: Request, res: Response, next: NextFunction): Promise<Response> {

        const book: UpdateResult = await BookStore.manager.update(Book, {book_number: req.params.id}, req.body);

        // when any ressource was updated
        if(book.affected === 0) return res.status(404).json({ message: 'Ressource Not Found' });

        return res.status(200).json({
            message: 'The ressource was updated successfully'
        })
    }

    public static async removeBook(req: Request, res: Response, next: NextFunction): Promise<Response> {
        
        const book: DeleteResult = await BookStore.manager.delete(Book, {
            book_number: req.params.id
        })

        // when any ressource was deleted
        if(book.affected === 0) return res.status(404).json({ message: 'Ressource Not Found' });

        return res.status(200).json({
            message: 'The book was deleted successfully'
        });
    }
}