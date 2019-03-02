import createIndex from '../../repository/createIndex';

const initDB = (userId) => {
    createIndex(userId);
}

export default initDB;