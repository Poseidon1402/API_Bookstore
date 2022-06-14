import * as express from 'express';
import { BookController } from '../controllers/book.controller';

export const bookRouter: express.Router = express.Router();

bookRouter.get('', BookController.retrieveAllBooks);