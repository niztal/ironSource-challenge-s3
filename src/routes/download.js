import express from 'express';
import path from 'path';
import getFileByName from '../repository/getFileByName';
import getFileById from '../repository/getFileById';
import validateFile from '../services/download/validateFile';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const {userId} = req;
    const {fileName, access_token} = req.query;

    if(!fileName) {
        res.status(400).send({message: "missing file name"});
    } else {
        try{
            const file = await getFileByName(userId, fileName);
            validateFile(file);
            res.download(path.join(path.resolve(__dirname, '../../'), 'storage', userId, file.name));
        } catch(err) {
            next(err);
        }
    }
});

router.get('/:fileId', async (req, res, next) => {
    const {userId} = req;
    const {fileId} = req.params;
    const {access_token} = req.query;

    if(!fileId) {
        res.status(400).send({message: "missing file id"});
    }
    if(!access_token) {
        res.status(400).send({message: "missing file access token"});
    } else {
        try{
            const file = await getFileById(userId, fileId);
            validateFile(file, access_token);
            res.download(path.join(path.resolve(__dirname, '../../'), 'storage', userId, file.name));
        } catch(err) {
            next(err);
        }
    }
});

export default router;