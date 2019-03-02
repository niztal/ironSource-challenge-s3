import express from 'express';
import getFileByName from '../repository/getFileByName';
import getFileById from '../repository/getFileById';
import validateFile from '../services/download/validateFile';
import updateFileByName from '../repository/updateFileByName';
import generate from 'password-generator';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const {userId} = req;
    const {fileName} = req.body;

    if(!fileName) {
        res.status(400).send({message: "missing file name"});
    } else {
        try{
            const file = await getFileByName(userId, fileName);
            validateFile(file)
            var newvalues = { $set: { isPrivate: !file.isPrivate, updatedAt: Date.now() } };
            if (!file.isPrivate) {
                newvalues.$set.accessToken = generate(12, false, /\w/);
            }
            await updateFileByName(userId, fileName, newvalues);
            res.send({
                "id": file.id,
                "name": file.name,
                "accessToken": file.accessToken,
            })
        } catch(err) {
            next(err);
        }
    }
})

export default router;