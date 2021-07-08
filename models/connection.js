require('dotenv').config();

const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;

let db = null;

const connection = async () => {
  try {
    if (db) return Promise.resolve(db);
    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = conn.db(DB_NAME);
    return db;
  } catch (err) {
    console.log(err);
    // process.exit();
  }
};

module.exports = connection;