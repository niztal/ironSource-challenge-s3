import express from 'express';
import upload from './upload';
import login from './login';

const router = express.Router();

router.use('/login', login);
router.use('/upload', upload);

//Default routing
router.get('/', (req, res) => {
    res.send({message: 'Hello World!!'});
});

export default router;