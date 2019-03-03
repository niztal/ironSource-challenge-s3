const getDb = require("../utils/db").getDb;

const createIndex = async (userId, fieldToIndex) => {
    const db = getDb();
    await db.collection(userId).ensureIndex([[fieldToIndex, 1]]);
}

export default createIndex;