const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManeger';
const DB_NAME = 'StoreManager';

const connection = () => {
  return MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db('DB_NAME'))
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

module.exports = connection;
