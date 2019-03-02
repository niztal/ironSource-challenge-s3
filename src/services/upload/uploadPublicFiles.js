import uploadFile from '../../utils/uploadFile';

const uploadPublicFiles = (userStorageFolder, files) => {
    Object.values(files).forEach((file) => {
        file.isPrivate = false;
        uploadFile(userStorageFolder, file);
    });
}

export default uploadPublicFiles;