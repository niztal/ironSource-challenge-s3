import path from 'path';
import generateId from 'password-generator';

const uploadFile = (userStorageFolder, file) => {
    const fileId = generateId(12, false, /\w/);
    file.mv(path.resolve(userStorageFolder, file.name));
    file.id = fileId;
}

export default uploadFile;