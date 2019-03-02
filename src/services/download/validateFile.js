import getFileByName from '../../repository/getFileByName';
import getFileById from '../../repository/getFileById';

const validateFile = (file, access_token) => {
    if (!file) {
        throw {status: 404, message: "file not found"};
    }
    if (file.isPrivate && file.accessToken !== access_token) {
        throw {status: 403, message: "file is private!"};
    }
}

export default validateFile;