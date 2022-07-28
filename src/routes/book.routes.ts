import * as express from 'express';
import { BookOperation } from '../controllers/book.controller';
import { BookRegistration } from '../middlewares/bookRegistration';

export const bookRouter: express.Router = express.Router();

bookRouter.get('', BookOperation.retrieveAllBooks);
bookRouter.post('', 
    [
        BookRegistration.validateData
    ],
    BookOperation.saveBook
);
bookRouter.get('/:id', BookOperation.getOneBook);
bookRouter.patch('/:id', BookOperation.modifyBookInfo);
bookRouter.delete('/:id', BookOperation.removeBook);