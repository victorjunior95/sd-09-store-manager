const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URL = 'mongodb://mongodb:27017/StoreManager';

let db = null;

const connection = async () => {
  if (db) return Promise.resolve(db);

  const connect = await MongoClient.connect(MONGO_URL, OPTIONS);
  db = connect.db('StoreManager');
  return db;
};

module.exports = connection;
