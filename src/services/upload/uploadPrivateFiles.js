import uploadFile from '../../utils/uploadFile';
import generate from 'password-generator';

const uploadPrivateFiles = (userStorageFolder, files) => {
    Object.values(files).forEach((file) => {
        const access_token = generate(12, false, /\w/);
        file.isPrivate = true;
        file.access_token = access_token;
        uploadFile(userStorageFolder, file);
    });
}

export default uploadPrivateFiles;