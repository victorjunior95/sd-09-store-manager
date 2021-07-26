const { MongoClient } = require('mongodb');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';
let db;

const connection = () => db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((connection) => {
      db = connection.db(DB_NAME);
      return db;
    }).catch((err) => console.log(err));

module.exports = connection;
