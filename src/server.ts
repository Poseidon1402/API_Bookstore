import * as http from 'http';
import * as express  from 'express';
import { BookStore } from './data-source';
import { bookRouter } from './routes/book.routes';
import { userRouter } from './routes/user.routes';
import { loginRouter } from './routes/auth.routes';
import { purchaseViewerRouter } from './routes/purchase.routes';

const app: express.Express = express();
const server: http.Server = http.createServer(app);
const port: number | string = process.env.PORT || 4000;

import cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(__dirname+'/../public'));

// all base routes
app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('', loginRouter);
app.use('', purchaseViewerRouter);

BookStore.initialize()
    .then(() => {
        BookStore.synchronize(false);
        return;
    });

server.listen(port, () => {
    console.log(`The server is listening on port ${port}...`);
});