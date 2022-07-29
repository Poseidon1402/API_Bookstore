import * as http from 'http';
import * as express  from 'express';
import { BookStore } from './data-source';
import { bookRouter } from './routes/book.routes';
import { userRouter } from './routes/user.routes';
import { NextFunction, Request, Response } from 'express';

const app: express.Express = express();
const server: http.Server = http.createServer(app);
const port: number | string = process.env.PORT || 4000;

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.static(__dirname+'/../public'));

// all base routes
app.use('/books', bookRouter);
app.use('/users', userRouter);

BookStore.initialize()
    .then(() => {
        console.log('initialized')
        return;
    })

server.listen(port, () => {
    console.log(`The server is listening on port ${port}...`);
});