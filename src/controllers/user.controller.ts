import { Request, Response } from "express";
import { Like } from "typeorm";
import { BookStore } from "../data-source";
import { User } from "../entity/User.entity";

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
} 