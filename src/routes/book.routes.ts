import * as express from 'express';
import { BookOperation } from '../controllers/book.controller';
import { BookPurchase } from '../controllers/purchase.controller';
import { AuthenticationGuard } from '../middlewares/authentication';
import { BookRegistration } from '../middlewares/bookRegistration';
import { FileUploader } from '../middlewares/fileUploader';

export const bookRouter: express.Router = express.Router();

bookRouter.get('', BookOperation.retrieveAllBooks);
bookRouter.post('', 
    [
        AuthenticationGuard.isJwtValid,
        AuthenticationGuard.isAuthor,
        FileUploader.file.single('file'),
        BookRegistration.validateData,
    ],
    BookOperation.saveBook
);
bookRouter.post('/addToCart', 
    [
        AuthenticationGuard.isJwtValid,
    ],
    BookPurchase.addToCart
);
bookRouter.post('/purchase',
    [
        AuthenticationGuard.isJwtValid
    ],
    BookPurchase.pay
)
bookRouter.get('/:id', BookOperation.getOneBook);
bookRouter.patch('/:id', 
    [
        AuthenticationGuard.isJwtValid,
        AuthenticationGuard.isAuthor,
        AuthenticationGuard.isOwner
    ],
    BookOperation.modifyBookInfo
);
bookRouter.delete('/:id', BookOperation.removeBook);