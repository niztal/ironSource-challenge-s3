import {getFileByName, getFileById} from '../../repository/getFile';

const validateFile = (file, access_token) => {
    if (!file) {
        throw {status: 404, message: "file not found"};
    }
    if (file.isPrivate && file.access_token !== access_token) {
        throw {status: 403, message: "file is private!"};
    }
}

export default validateFile;