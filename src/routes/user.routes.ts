import { Router } from "express";
import { UserOperation } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter.get('/:id', UserOperation.retrieveSingleUser);