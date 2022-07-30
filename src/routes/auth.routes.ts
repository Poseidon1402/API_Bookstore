import { Router } from "express";
import { UserAuthenticator, UserOperation } from "../controllers/user.controller";
import { userLoginHandler } from "../middlewares/authentication";
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

loginRouter.post('/login', 
    [
        userLoginHandler.isUserExist
    ],
UserAuthenticator.authenticate);