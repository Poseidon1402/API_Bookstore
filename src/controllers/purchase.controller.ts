import { NextFunction, Request, Response } from "express";
import { BookStore } from "../data-source";
import { Book } from "../entity/Book.entity";
import { Purchase } from "../entity/Purchase.entity";
import { User } from "../entity/User.entity";

export class BookPurchase {

    public static async addToCart(req: Request, res: Response, next: NextFunction) {

        const book: Book = await BookStore.manager.findOneBy(Book, {
            book_number: req.query.book.toString()
        });

        const purchase: Purchase = new Purchase();
        purchase.book = book;
        purchase.user = await BookStore.manager.findOneBy(User, {
            code_user: (req as any).clientId
        });

        return res.status(201).json({
            status: "201",
            message: "The book was successfully added inside your cart"
        });
    }
}