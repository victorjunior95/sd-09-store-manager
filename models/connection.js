const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017';
const DB_NAME = 'StoreManager';

/** @type { import('mongodb').Db } */
let connectionPool;

async function connection(collectionName) {
  if (!connectionPool) {
    const mongoConnection = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoConnection.db(DB_NAME);
    connectionPool = db;
  }
  return connectionPool.collection(collectionName);
}

module.exports = connection;
