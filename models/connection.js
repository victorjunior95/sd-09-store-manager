const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017';
const DB_NAME = 'StoreManager';

let connectionPool;

/**
 * @returns { Promise<mongo.Db> }
 */
async function connection() {
  if (!connectionPool) {
    connectionPool = await MongoClient
      .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((connection) => connection.db(DB_NAME));
  }
  return connectionPool;
}

module.exports = connection;
