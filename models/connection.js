const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = async () => {
  try {
    if (db) return Promise.resolve(db);
    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = conn.db(DB_NAME);
    return db;
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;