import fs from 'fs';
const getDb = require("../utils/db").getDb;

const getFileById = async (userId, fileId) => {
    const db = getDb();
    return await db.collection(userId).findOne({_id: fileId});
}

const getFileByName = async (userId, fileName) => {
    const db = getDb();
    return await db.collection(userId).findOne({name: fileName});
}

export {
    getFileById,
    getFileByName
};