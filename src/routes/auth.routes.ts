import { Router } from "express";
import { UserAuthenticator, UserOperation } from "../controllers/user.controller";
import { UserSubscription } from "../middlewares/userSubscription";

export const loginRouter = Router();

loginRouter.post('/subscribe', 
    [
        UserSubscription.checkUserDuplication,
        UserSubscription.setUserIdentification,
        UserSubscription.validateUserInformation
    ],
    UserOperation.subscribeUser
);

loginRouter.post('/login', UserAuthenticator.authenticate);