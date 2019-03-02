import express from 'express';
import path from 'path';
import validateFile from '../services/download/validateFile';
import downloadPublicFile from '../services/download/downloadPublicFile';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const {userId} = req;
    const {fileName, access_token} = req.query;

    if(!fileName) {
        res.status(400).send({message: "missing file name"});
    } else {
        try{
            await validateFile(userId, fileName);
            res.download(path.join(path.resolve(__dirname, '../../'), 'storage', userId, fileName));
        } catch(err) {
            next(err);
        }
    }
});

export default router;