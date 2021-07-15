const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let dataBase = null;

const connection = () => {
  return dataBase
    ? Promise.resolve(dataBase)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        dataBase = conn.db(DB_NAME);
        return dataBase;
      });
};

module.exports = connection;
