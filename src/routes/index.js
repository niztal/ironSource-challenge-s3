import express from 'express';
import upload from './upload';
import login from './login';
import download from './download';

const router = express.Router();

router.use('/login', login);
router.use('/upload', upload);
router.use('/download', download)

//Default routing
router.get('/', (req, res) => {
    res.send({message: 'Hello World!!'});
});

export default router;