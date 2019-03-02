import express from 'express';
import upload from './upload';
import login from './login';
import download from './download';
import update from './update';
import deleteFile from './delete';

const router = express.Router();

router.use('/login', login);
router.use('/upload', upload);
router.use('/download', download)
router.use('/update', update);
router.use('/delete', deleteFile);

//Default routing
router.get('/', (req, res) => {
    res.send({message: 'Hello World!!'});
});

export default router;