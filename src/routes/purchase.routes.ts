import { Router } from "express";
import { PurchaseViewer } from "../controllers/purchase.controller";
import { AuthenticationGuard } from "../middlewares/authentication";

export const purchaseViewerRouter: Router = Router();

purchaseViewerRouter.get('/mypurchase', 
    [
        AuthenticationGuard.isJwtValid
    ],
    PurchaseViewer.fetchAllPurchaseLinkedTheConnectedUser
)