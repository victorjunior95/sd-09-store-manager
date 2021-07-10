const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

let db = null;

const DB_NAME = 'StoreManager';

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      })
      .catch((err) => {
        console.log(err);
        process.exit();
      });
};

module.exports = connection;
