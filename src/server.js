import express from 'express';
import fileUpload from 'express-fileupload';
import routes from './routes';
import bodyParser from 'body-parser';
import {authMiddleware, errorHandlingMiddleware} from './middlewares';
import mongodb from 'mongodb';

const initDb = require("./utils/db").initDb;

const app = express();
const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017';

app.use(authMiddleware);
app.use(fileUpload());
app.use(bodyParser.json());
app.use('/', routes);
app.use(errorHandlingMiddleware);

initDb((err) => {
    app.listen(5000, () => {
        console.log("upload server is up at port: " + 5000);
    });
});

