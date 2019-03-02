import path from 'path';
import generate from 'password-generator';

const uploadFile = (userStorageFolder, file) => {
    const fileId = generate(12, false, /\w/);
    file.mv(path.resolve(userStorageFolder, file.name));
    file.id = fileId;
}

export default uploadFile;