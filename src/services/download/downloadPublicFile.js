import getFile from '../../repository/getFile';

const downloadPublicFile = (userId, fileName) => {
    return getFile(userId, fileName);
}