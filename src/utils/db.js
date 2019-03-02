const assert = require("assert");
const client = require("mongodb").MongoClient;
const mongoUrl = 'mongodb://localhost:27017';

let _db;

const initDb = (callback) => {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    client.connect(mongoUrl, (err, client) => {
        if (err) {
            return callback(err);
        }
        _db = client.db('storage');
        return callback(null, _db);
    });
}

const getDb = () => {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

module.exports = {
    getDb,
    initDb
};