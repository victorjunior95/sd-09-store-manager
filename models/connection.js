const { MongoClient } = require('mongodb');
// For references check: https://docs.mongodb.com/manual/reference/method/js-collection/

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => conn.db(DB_NAME) );
};

module.exports = connection;
