import { NextFunction, Request, Response } from "express";
import * as moment from "moment";

export class UserSubscription {
    
    public static setUserIdentification(req: Request, res: Response, next: NextFunction){

        // get the current timestamp
        const now = Date.now();     
        
        // check if the user choose as a client or an author
        const identifier: string = req.body.role === "CLIENT" ? `C_${now}` : `A_${now}`;
        req.body.code_user = identifier;
        
        next();
    }
}