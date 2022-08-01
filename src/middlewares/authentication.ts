import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";
import { BookStore } from "../data-source";
import { Book } from "../entity/Book.entity";
import { User } from "../entity/User.entity";

export class userLoginHandler {

    public static async isUserExist(req: Request, res: Response, next: NextFunction){

        const user: User = await BookStore.manager.findOneBy(User, {
            email: req.body.email
        });

        if(!user) return res.status(401).json({
            message: "Unable to find user. You should subscribe first !"
        });

        next();
    }
}

export class AuthenticationGuard {

    public static isJwtValid(req: Request, res: Response, next: NextFunction){
        
        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({
                message: 'No token provided! You should log in first.'
            });
        }

        jwt.verify(token.split(' ')[1], jwtConfig.secret, (err: any, decoded: any) => {
            if(err){
                return res.status(401).json({
                    message: err.message 
                });
            }

            (req as any).clientId = decoded.id;
            (req as any).clientEmail = decoded.email;
            (req as any).role = decoded.role;

            next();
        });
    }

    public static isClient(req: Request, res: Response, next: NextFunction){

        if((req as any).role !== "CLIENT") return res.status(401).json({
            message: "You are not a client."
        });

        next();
    }

    public static isAuthor(req: Request, res: Response, next: NextFunction){

        if((req as any).role !== "AUTHOR") return res.status(401).json({
            message: "Only author can access this ressource/functionality."
        });

        next();
    }

    public static async isOwner(req: Request, res: Response, next: NextFunction){

        const book: Book = await BookStore.manager.findOne(Book, {
            where: {
                book_number: req.params.id
            },
            relations: {
                user: true
            }
        });

        if((req as any).clientEmail !== book.user.email){

            return res.status(401).json({
                status: "401",
                message: "Forbidden ! This ressource is not yours"
            });
        }

        next();
    }
}