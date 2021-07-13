const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const LOCAL_MONGO_DB_URL = 'mongodb://localhost:27017';
// const MONGO_DB_URL = 'mongodb://mongodb:27017';
const DB_NAME = 'StoreManager';

let db = null;

const connection = () => (
  db ? Promise.resolve(db)
    : MongoClient.connect(LOCAL_MONGO_DB_URL, OPTIONS)
      .then((conn) => db = conn.db(DB_NAME))
);

module.exports = connection;
