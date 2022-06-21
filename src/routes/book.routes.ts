import * as express from 'express';
import { BookOperation } from '../controllers/book.controller';

export const bookRouter: express.Router = express.Router();

bookRouter.get('', BookOperation.retrieveAllBooks);
bookRouter.post('', BookOperation.saveBook);
bookRouter.patch('/:id', BookOperation.modifyBookInfo);
bookRouter.delete('/:id', BookOperation.removeBook);