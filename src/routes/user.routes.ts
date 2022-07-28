import { Router } from "express";
import { UserOperation } from "../controllers/user.controller";
import { UserSubscription } from "../middlewares/userSubscription";

export const userRouter: Router = Router();

userRouter.get('', UserOperation.findUserByTheirName);
userRouter.get('/:id', UserOperation.retrieveSingleUser);
userRouter.post('', 
    [
        UserSubscription.checkUserDuplication,
        UserSubscription.setUserIdentification
    ],
    UserOperation.subscribeUser
);