import getFile from '../../repository/getFile';

const validateFile = async (userId, fileName, access_token) => {
    let file;
    file = await getFile(userId, fileName);
    if (!file) {
        throw {status: 404, message: "file not found"};
    }
    if (file.isPrivate && file.access_token !== access_token) {
        throw {status: 403, message: "file is private, please send valid access_token in order to download it"};
    }
}

export default validateFile;