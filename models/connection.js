const { MongoClient } = require('mongodb');

const DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
};

module.exports = connection;
