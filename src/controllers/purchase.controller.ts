import { NextFunction, Request, Response } from "express";
import { Stripe } from "stripe";
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

        await BookStore.manager.save(purchase);

        return res.status(201).json({
            status: "201",
            message: "The book was successfully added inside your cart",
            purchase: purchase
        });
    }

    public static async pay(req: Request, res: Response, next: NextFunction) {
        
        const stripe: Stripe = require('stripe')(process.env.STRIPE_API_KEY);
        const purchase: Purchase = await BookStore.manager.findOne(Purchase, {
            relations: {
                book: true
            },
            where: {
                id: req.query.id as unknown as number
            }
        });

        const cardToken = await stripe.tokens.create({
            card: {
                ...req.body
            },
        });
        
        const charge = await stripe.charges.create({
            amount: purchase.book.price*100,
            currency: "eur",
            source: cardToken.id,
            receipt_email: 'rajoelisonainatiavina@gmail.com',
            description: `Stripe Charge Of Amount ${purchase.book.price}€ for One Time Payment`,
        });

        if (charge.status === "succeeded") {
            purchase.payed = true;
            await BookStore.manager.update(Purchase, {id: req.query.id as unknown as number}, purchase);

            return res.status(200).json({
                message: "Payment done successfully",
                paymentConfirmationUrl: charge.receipt_url
            });
        }else {
            return res.status(200).json({
                message: "An error occurred !! Check your card or your bank account."
            });
        }
    }
}