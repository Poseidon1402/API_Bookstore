import * as express from 'express';
import { BookOperation } from '../controllers/book.controller';

export const bookRouter: express.Router = express.Router();

bookRouter.get('', BookOperation.retrieveAllBooks);