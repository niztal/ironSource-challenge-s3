import express from 'express';
import {getFileByName, getFileById} from '../repository/getFile';
import validateFile from '../services/download/validateFile';
import {updateFileByName, updateFileById} from '../repository/updateFile';
import generate from 'password-generator';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const {userId} = req;
    const {fileName, access_token} = req.body;

    if(!fileName) {
        res.status(400).send({message: "missing file name"});
    } else {
        try{
            const file = await getFileByName(userId, fileName);
            validateFile(file, access_token);
            var newValues = { $set: { isPrivate: !file.isPrivate, updatedAt: Date.now() } };
            if (!file.isPrivate) {
                newValues.$set.access_token = generate(12, false, /\w/);
            } else {
                newValues.$set.access_token = null;
            }
            await updateFileByName(userId, fileName, newValues);
            res.send({
                "id": file._id,
                "name": file.name,
                "access_token": newValues.$set.access_token,
                "isPrivate": !file.isPrivate
            })
        } catch(err) {
            next(err);
        }
    }
});

router.post('/:fileId', async (req, res, next) => {
    const {userId} = req;
    const {fileId} = req.params;
    const {access_token} = req.body;

    if(!fileId) {
        res.status(400).send({message: "missing file id"});
    } else {
        try{
            const file = await getFileById(userId, fileId);
            validateFile(file, access_token);
            var newValues = { $set: { isPrivate: !file.isPrivate, updatedAt: Date.now() } };
            if (!file.isPrivate) {
                newValues.$set.access_token = generate(12, false, /\w/);
            } else {
                newValues.$set.access_token = null;
            }
            await updateFileById(userId, fileId, newValues);
            res.send({
                "id": file._id,
                "name": file.name,
                "access_token": newValues.$set.access_token,
                "isPrivate": !file.isPrivate
            })
        } catch(err) {
            next(err);
        }
    }
});

export default router;