import { Router } from "express";
import { UserOperation } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter.get('', UserOperation.findUserByTheirName);
userRouter.get('/:id', UserOperation.retrieveSingleUser);
userRouter.post('', UserOperation.subscribeUser);