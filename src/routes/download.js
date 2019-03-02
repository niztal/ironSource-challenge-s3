import express from 'express';
import path from 'path';
import getFileByName from '../repository/getFileByName';
import getFileById from '../repository/getFileById';
import validateFile from '../services/download/validateFile';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const {userId} = req;
    const {fileName, metadata} = req.query;

    if(!fileName) {
        res.status(400).send({message: "missing file name"});
    } else {
        try{
            const file = await getFileByName(userId, fileName);
            validateFile(file);
            if (metadata) {
                res.send(getFileMetaData(file));
            } else {
                res.download(path.join(path.resolve(__dirname, '../../'), 'storage', userId, file.name));
            }
        } catch(err) {
            next(err);
        }
    }
});

router.get('/:fileId', async (req, res, next) => {
    const {userId} = req;
    const {fileId} = req.params;
    const {access_token, metadata} = req.query;

    if(!fileId) {
        res.status(400).send({message: "missing file id"});
    }
    if(!access_token) {
        res.status(400).send({message: "missing file access token"});
    } else {
        try{
            const file = await getFileById(userId, fileId);
            validateFile(file, access_token);
            if (metadata) {
                res.send(getFileMetaData(file));
            } else {
                res.download(path.join(path.resolve(__dirname, '../../'), 'storage', userId, file.name));
            }
        } catch(err) {
            next(err);
        }
    }
});


const getFileMetaData = (file) => {
    const metadata =  {
            name: file.name,
            size: file.size,
            createdAt: new Date(file.createdAt)
    };
    if (file.updatedAt) {
        metadata.updatedAt = new Date(file.updatedAt)
    }
    if (file.deletedAt) {
        metadata.deletedAt = new Date(file.deletedAt)
    }
    return metadata;
}

export default router;