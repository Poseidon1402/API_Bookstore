import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { BookStore } from "../data-source";
import { BookObjectForCreation, BookObjectForModification } from "../dto/book.dto";
import { Book } from "../entity/Book.entity";

export class BookOperation {

    public static async retrieveAllBooks(req: Request, res: Response): Promise<Response> {

        const books: Book[] = await BookStore.manager.find(Book);
        
        return res.status(200).json(books);
    }

    public static async saveBook(req: Request, res: Response): Promise<Response> {

        try {
            const book: BookObjectForCreation = req.body;
    
            await BookStore.manager.insert(Book, book);
        }catch(err: any){
            
            return res.status(400).json({
                Error: err
            })
        }

        return res.status(201).json({
            message: 'The book was saved successfully',
        });
    }

    public static async modifyBookInfo(req: Request, res: Response): Promise<Response> {

        const book: BookObjectForModification = req.body;
        const result: UpdateResult = await BookStore.manager.update(Book, {book_number: req.params.id}, book);

        // when no ressource was updated
        if(result.affected === 0) return res.status(404).json({ message: 'Ressource Not Found' });

        return res.status(200).json({
            message: 'The ressource was updated successfully'
        })
    }

    public static async removeBook(req: Request, res: Response): Promise<Response> {
        
        const book: DeleteResult = await BookStore.manager.delete(Book, {
            book_number: req.params.id
        })

        // when no ressource was deleted
        if(book.affected === 0) return res.status(404).json({ message: 'Ressource Not Found' });

        return res.status(200).json({
            message: 'The book was deleted successfully'
        });
    }
}
