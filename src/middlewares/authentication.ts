import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";
import { BookStore } from "../data-source";
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

    public static async isJwtValid(req: Request, res: Response, next: NextFunction){
        
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
            
            next();
        });
    }
}