import * as http from 'http';
import * as express  from 'express';
import { BookStore } from './data-source';
import { bookRouter } from './routes/book.routes';

const app: express.Express = express();
const server: http.Server = http.createServer(app);
const port: number | string = process.env.PORT || 4000;
app.use(express.json()); 

app.use('/books', bookRouter);

BookStore.initialize()
    .then(() => {
        console.log('initialized')
        return;
    })

server.listen(port, () => {
    console.log(`The server is listening on port ${port}...`);
});