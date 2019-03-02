import express from 'express';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import uploadPrivateFiles from '../services/upload/uploadPrivateFiles';
import uploadPublicFiles from '../services/upload/uploadPublicFiles';
import indexFilesMetadata from '../services/upload/indexFilesMetadata';

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.files) {
        res.status(400).send({message: 'missing files to upload'})
    } else{
        const {userId, files} = req;
        const {isPrivate} = req.body;

        const userStorageFolder = path.join(path.resolve(__dirname, '../../'), 'storage', userId);
        if (!fs.existsSync(userStorageFolder)){
            mkdirp(userStorageFolder);
        }
        let uploadedFiles;
        if (isPrivate) {
            uploadPrivateFiles(userStorageFolder, files);
        } else {
            uploadPublicFiles(userStorageFolder, files);
        }
        indexFilesMetadata(userId, files);
        const response = Object.values(files).map((file) => {
            return {
                "id": file.id,
                "name": file.name,
                "accessToken": file.accessToken
            } 
        });
        res.status(201).send(response);
    }
})

export default router;
