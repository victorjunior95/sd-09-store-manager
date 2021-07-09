const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// para uso local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// para fazer o push
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((connection) => {
        db = connection.db(DB_NAME);
        return db;
      });
};

module.exports = connection;
