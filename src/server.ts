import * as http from 'http';
import * as express  from 'express';
import { BookStore } from './data-source';

const app: express.Express = express(); 
const server: http.Server = http.createServer(app);
const port: number | string = process.env.PORT || 4000;

BookStore.initialize()
    .then(() => {
        console.log('Database intialized successfully !!');
        return;
    })
    .catch(error => console.log(error))

server.listen(port, () => {
    console.log(`The server is listening on port ${port}...`);
});