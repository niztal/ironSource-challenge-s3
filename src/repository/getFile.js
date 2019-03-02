import fs from 'fs';
const getDb = require("../utils/db").getDb;

const getFile = async (userId, fileName) => {
    const db = getDb();
    return await db.collection('metadata').findOne({userId: userId, name: fileName});
}

export default getFile;