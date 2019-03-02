const getDb = require("../utils/db").getDb;

const insertFileMetadata = (userId, file) => {
    const db = getDb();
    const fileMetaData = {
        _id: file.id,
        userId: userId,            
        name: file.name,
        size: file.size,
        isPrivate: file.isPrivate,
        accessToken: file.accessToken,
        createdAt: Date.now()
    };
    db.collection('metadata').insertOne(fileMetaData);
}

export default insertFileMetadata;