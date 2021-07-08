const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:27017/StoreManager';
// const MONGODB_URI = 'mongodb://mongodb:27017/StoreManager';

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DB_NAME = 'StoreManager';

const connection = async () => ((await MongoClient
  .connect(MONGODB_URI, OPTIONS))
  .db(DB_NAME));

module.exports = connection;
