const getDb = require("../utils/db").getDb;

const createIndex = (userId, fieldToIndex) => {
    const db = getDb();
    db.collection(userId).ensureIndex([["name", 1]]);
}

export default createIndex;