import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BookStore } from "../data-source";
import { UserObjectInterface, ValidationErrorInterface } from "../dto/utilities";
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

    public static validateUserInformation(req: Request, res: Response, next: NextFunction){
        const userObj: UserObjectInterface = req.body;
        let user: User = new User(userObj.code_user, userObj.firstName, userObj.lastName,
            userObj.email, userObj.birthDate, userObj.role, userObj.password);
        
        validate(user)
            .then(errors => {
                // errors is an array of validation errors
                if (errors.length > 0) {
                    
                    let validatorFailed: ValidationErrorInterface[] = [];
                    errors.forEach(err => {
                        validatorFailed.push({
                            property: err.property,
                            message: err.constraints
                        });
                    });

                    return res.status(400).json(validatorFailed);
                }

                next();
            });
    }
}