const { MongoClient } = require('mongodb');
require ('dotenv/config');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MONGOLOCAL_DB_URL } = process.env;
const MONGOCONNECTION = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => {
  return MongoClient.connect(MONGOLOCAL_DB_URL || MONGOCONNECTION, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => { console.log(err); process.exit(); });
};

module.exports = connection;
