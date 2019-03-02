import insertFileData from '../../repository/insertFileMetadata';

const indexFilesMetadata = (userId, files) => {
    Object.values(files).forEach((file) => {
        insertFileData(userId, file);
    })
}

export default indexFilesMetadata;