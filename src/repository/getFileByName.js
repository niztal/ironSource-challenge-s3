import fs from 'fs';
const getDb = require("../utils/db").getDb;

const getFileByName = async (userId, fileName) => {
    const db = getDb();
    return await db.collection(userId).findOne({name: fileName});
}

export default getFileByName;