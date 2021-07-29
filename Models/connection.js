// models/connection.js

const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const urlLocation = process.env.urlLocation || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'StoreManager';


let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(urlLocation || MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      });
};


module.exports = connection;