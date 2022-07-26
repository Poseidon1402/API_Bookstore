import { Request, Response } from "express";
import { BookStore } from "../data-source";
import { User } from "../entity/User.entity";

export class UserOperation {

    public static async retrieveSingleUser(req: Request, res: Response): Promise<Response> {

        const user: User = await BookStore.manager.findOne(User, {
            where: {
                code_user: req.params.id
            }
        });

        return res.status(200).json(user);
    }
} 