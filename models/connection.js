// Connection (para a turma 10...)

const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const COLLECTION = 'StoreManager';

let db = null;

const connection = async () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(COLLECTION);
        return db;
      });
};

module.exports = connection;
