import http from 'http';
import express  from 'express';

const app: express.Express = express(); 
const server: http.Server = http.createServer(app);
const port: number | string = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`The server is listening on port ${port}...`);
});