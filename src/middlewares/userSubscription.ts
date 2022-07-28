import { NextFunction, Request, Response } from "express";
import * as moment from "moment";
import { BookStore } from "../data-source";
import { User } from "../entity/User.entity";

export class UserSubscription {
    
    public static setUserIdentification(req: Request, res: Response, next: NextFunction){

        // get the current timestamp
        const now = Date.now();     
        
        // check if the user choose as a client or an author
        const identifier: string = req.body.role === "CLIENT" ? `C_${now}` : `A_${now}`;
        req.body.code_user = identifier;
        
        next();
    }

    public static async checkUserDuplication(req: Request, res: Response, next: NextFunction){

        const user: number = await BookStore.manager.count(User, {
            where: {
                email: req.body.email
            }
        });

        if (user === 1) return res.status(401).json({
            status: '401',
            message: 'User already exists !!'
        });

        next();
    }
}