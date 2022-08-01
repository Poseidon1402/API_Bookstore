import { Request, Response } from "express";
import * as fs from 'fs';
import { UpdateResult, Like} from "typeorm";
import { BookStore } from "../data-source";
import { BookObjectForCreation, BookObjectForModification } from "../dto/book.dto";
import { Book } from "../entity/Book.entity";
import { User } from "../entity/User.entity";

export class BookOperation {

    public static async retrieveAllBooks(req: Request, res: Response): Promise<Response> {

        const search = req.query.title && {title: Like('%'+req.query.title+'%')};
        const books: Book[] = await BookStore.manager.find(Book, {
            where: search
        });
        
        return res.status(200).json(books);
    }

    public static async saveBook(req: Request, res: Response): Promise<Response> {

        const book: BookObjectForCreation = {
            ...req.body,
            bookFileUrl: `${req.protocol}://${req.get('host')}/uploads/${(req as any).file.filename}`,
            user: await BookStore.manager.findOneBy(User, {email: (req as any).clientEmail})
        };
        
        try{
            await BookStore.manager.insert(Book, book);
        }catch(error: any){
            res.status(400).json({message: error});
        }
            
        return res.status(201).json({
            message: 'The book was saved successfully',
        });
    }

    public static async getOneBook(req: Request, res: Response): Promise<Response> {

        const book: Book = await BookStore.manager.findOne(Book, {
            where: {
                book_number: req.params.id
            }
        });

        return res.status(200).json(book);
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

    public static async removeBook(req: Request, res: Response) {
        
        BookStore.manager.findOneBy(Book, {
            book_number: req.params.id
        })
        .then((book: Book): void | Response => {

            if(!book) return res.status(404).json({message: "Ressource not found !"});

            const filename = book.bookFileUrl.split('/uploads/')[1];
                const filePath = `${__dirname.split('/src')[0]}/public/uploads/${filename}`;
                
                fs.unlink(filePath, () => {
                    
                    BookStore.manager.delete(Book, {
                        book_number: req.params.id
                    })
                    .then( () => {
            
                        return res.status(200).json({
                            message: 'The ressource was deleted successfully',
                        })
                    })
                    .catch( (err: any): Response => res.status(400).json({ err })) 
                });
        });
    }
}
