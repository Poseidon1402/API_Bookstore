import * as express from 'express';
import { BookOperation } from '../controllers/book.controller';
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
bookRouter.get('/:id', BookOperation.getOneBook);
bookRouter.patch('/:id', BookOperation.modifyBookInfo);
bookRouter.delete('/:id', BookOperation.removeBook);