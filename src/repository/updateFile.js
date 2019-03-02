const getDb = require("../utils/db").getDb;

const updateFileById = async (userId, fileId, newValues) => {
    const db = getDb();
    await db.collection(userId).updateOne({_id: fileId}, newValues);
}
const updateFileByName = async (userId, fileName, newValues) => {
    const db = getDb();
    await db.collection(userId).updateOne({name: fileName}, newValues);
}

export {
    updateFileById,
    updateFileByName
};