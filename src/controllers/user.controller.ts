import { Request, Response } from "express";
import { InsertResult, Like, TypeORMError } from "typeorm";
import { BookStore } from "../data-source";
import { User } from "../entity/User.entity";
import * as bcrypt from 'bcrypt';

export class UserOperation {

    public static async findUserByTheirName(req: Request, res: Response): Promise<Response> {

        const name = req.query.name && req.query.name;
        const users: User[] = await BookStore.manager.findBy(User, {
            firstName: Like(`%${name}%`),
            lastName: Like(`%${name}%`)
        });

        return res.status(200).json(users);
    }

    public static async retrieveSingleUser(req: Request, res: Response): Promise<Response> {

        const user: User = await BookStore.manager.findOne(User, {
            where: {
                code_user: req.params.id
            }
        });

        return res.status(200).json(user);
    }

    public static async subscribeUser(req: Request, res: Response): Promise<void> {
        
        bcrypt.hash(req.body.password, 8)
            .then((hashedPassword: string) => {
                
                req.body.password = hashedPassword;
                BookStore.manager.insert(User, req.body)
                    .then(async(ans: InsertResult) => {

                        const user: User = await BookStore.manager.findOneBy(User, {
                            code_user: ans.identifiers[0].code_user
                        })
                        return res.status(201).json(user);
                    })
                    .catch((error: TypeORMError) => {

                        return res.status(500).json({
                            name: error.name,
                            message: error.message
                        });
                    })
                    .catch(() => {

                        return res.status(400).json({
                            message: 'It is an error from the client'
                        });
                    })
            })
            .catch((err: any) => {

                return res.status(500).json({
                    message: err.message
                });
            });       
    }
} 