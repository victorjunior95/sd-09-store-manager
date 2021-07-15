const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser:true, 
  useUnifiedTopology: true
};

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = async () =>
  MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => conn.db(DB_NAME)
  ).catch(
    err => {
      console.error(err);
      process.exit(1);
    }
  );

module.exports = connection;

//  Uiton Rocha  me ajudou com a conexão