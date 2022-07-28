import { NextFunction, Request, Response } from "express";

export class UserSubscription {
    
    public static setUserIdentification(req: Request, res: Response, next: NextFunction){

        // check if the user choose as a client or an author
        const identifier: string = req.body.roles === "CLIENT" ? `C_${new Date()}` : `A_${new Date()}`;
        req.body.code_user = identifier;
        
        next();
    }
}