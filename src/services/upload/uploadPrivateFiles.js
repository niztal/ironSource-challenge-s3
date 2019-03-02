import uploadFile from '../../utils/uploadFile';
import generate from 'password-generator';

const uploadPrivateFiles = (userStorageFolder, files) => {
    Object.values(files).forEach((file) => {
        const accessToken = generate(12, false, /\w/);
        file.isPrivate = true;
        file.accessToken = accessToken;
        uploadFile(userStorageFolder, file);
    });
}

export default uploadPrivateFiles;