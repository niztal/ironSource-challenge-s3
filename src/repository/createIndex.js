const getDb = require("../utils/db").getDb;

const createIndex = (userId, fieldToIndex) => {
    const db = getDb();
    db.collection('metadata').ensureIndex([["userId", 1], ["name", 1]]);
}

export default createIndex;