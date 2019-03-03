import createIndex from '../../repository/createIndex';

const initDB = async (userId) => {
    await createIndex(userId, "name");
}

export default initDB;