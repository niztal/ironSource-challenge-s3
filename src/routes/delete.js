import express from 'express';
import {getFileByName, getFileById} from '../repository/getFile';
import validateFile from '../services/download/validateFile';
import {updateFileByName, updateFileById} from '../repository/updateFile';

const router = express.Router();

router.delete('/', async (req, res, next) => {
    const {userId} = req;
    const {fileName, access_token} = req.body;

    if(!fileName) {
        res.status(400).send({message: "missing file name"});
    } else {
        try{
            const file = await getFileByName(userId, fileName);
            validateFile(file, access_token);
            if (file.isDeleted) {
                throw {status: 404, message: "file deleted"}
            }
            var newValues = { $set: { isDeleted: true, deletedAt: Date.now() } };
            await updateFileByName(userId, fileName, newValues);
            res.status(202).send({message: "file deleted successfully"});
        } catch(err) {
            next(err);
        }
    }
});

router.delete('/:fileId', async (req, res, next) => {
    const {userId} = req;
    const {fileId} = req.params;
    const {access_token} = req.body;

    if(!fileId) {
        res.status(400).send({message: "missing file id"});
    } else {
        try{
            const file = await getFileById(userId, fileId);
            validateFile(file, access_token);
            if (file.isDeleted) {
                throw {status: 404, message: "file deleted"}
            }
            var newValues = { $set: { isDeleted: true, deletedAt: Date.now() } };
            await updateFileById(userId, fileId, newValues);
            res.status(202).send({message: "file deleted successfully"});
        } catch(err) {
            next(err);
        }
    }
});
export default router;
