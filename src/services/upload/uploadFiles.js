import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import uploadPrivateFiles from './uploadPrivateFiles';
import uploadPublicFiles from './uploadPublicFiles';
import indexFilesMetadata from './indexFilesMetadata';

const uploadFiles = (userId, files, isPrivate) => {
    const userStorageFolder = path.join(path.resolve(__dirname, '../../../'), 'storage', userId);
    if (!fs.existsSync(userStorageFolder)){
        mkdirp(userStorageFolder);
    }
    let uploadedFiles;
    if (isPrivate) {
        uploadedFiles = uploadPrivateFiles(userStorageFolder, files);
    } else {
        uploadedFiles = uploadPublicFiles(userStorageFolder, files);
    }
    indexFilesMetadata(userId, files);
};

export default uploadFiles;