const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGODB_URL = 'mongodb://mongodb:27017/StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;
const connection = async () => {
  if (db) {
    return Promise.resolve(db);
  }

  const conn = await MongoClient.connect(MONGODB_URL, OPTIONS);
  db = conn.db(DB_NAME);
  return db;
};
//BASE DE DADOS DO README SD-09
module.exports = connection;
