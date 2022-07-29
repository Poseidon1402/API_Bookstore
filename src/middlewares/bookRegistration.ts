import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationErrorInterface } from "../dto/utilities";
import { Book } from "../entity/Book.entity";

export class BookRegistration {

    public static validateData(req: Request, res: Response, next: NextFunction){

        const { title, description, category, price, page_number, language} = req.body;
        const book: Book = new Book(title, description, category, price, page_number, language);

        validate(book)
            .then(errors => {
                // errors is an array of validation errors
                /*if (errors.length > 0) {
                    
                    let validatorFailed: ValidationErrorInterface[] = [];
                    errors.forEach(err => {
                        validatorFailed.push({
                            property: err.property,
                            message: err.constraints
                        });
                    });

                    return res.status(400).json(validatorFailed);
                }*/

                next();
            });
    }
}