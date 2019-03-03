const getDb = require("../utils/db").getDb;

const getUser = async (userId) => {
    const db = getDb();
    return await db.collection('users').findOne({userId});
}

export default getUser;