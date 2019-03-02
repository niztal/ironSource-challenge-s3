import express from 'express';
import fileUpload from 'express-fileupload';
import routes from './routes';
import authMiddleware from './middlewares/authMiddleware';
import mongodb from 'mongodb';

const initDb = require("./utils/db").initDb;

const app = express();
const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017';

app.use(authMiddleware);
app.use(fileUpload());
app.use('/', routes);

initDb((err) => {
    app.listen(5000, () => {
        console.log("API Up and running on port " + 5000);
    });
});

