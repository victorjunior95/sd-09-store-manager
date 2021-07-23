const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const client = new MongoClient(MONGO_DB_URL);

module.exports = client;
