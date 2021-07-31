const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
//const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/StoreManager';
const DB_NAME = 'StoreManager';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db;

const connection = async () => {
  return db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

module.exports = connection;
