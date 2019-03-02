const getDb = require("../utils/db").getDb;

const insertFileMetadata = (userId, file) => {
    const db = getDb();
    const fileMetaData = {
        _id: file.id,
        userId: userId,            
        name: file.name,
        size: file.size,
        isPrivate: file.isPrivate,
        access_token: file.access_token,
        createdAt: Date.now()
    };
    db.collection(userId).insertOne(fileMetaData);
}

export default insertFileMetadata;