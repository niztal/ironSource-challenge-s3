const getDb = require("../utils/db").getDb;

const updateFileByName = async (userId, fileName, newValues) => {
    const db = getDb();
    await db.collection(userId).updateOne({name: fileName}, newValues);
}

export default updateFileByName;