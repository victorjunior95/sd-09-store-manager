const { MongoClient } = require('mongodb');

const MONGO_DB_URL1 = 'mongodb://localhost:27017/StoreManager'; // testes locais 
const MONGO_DB_URL2 = 'mongodb://mongodb:27017/StoreManager'; // teste avaliador
const DB_NAME = 'StoreManager';

const connection = () => MongoClient
  .connect(MONGO_DB_URL1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;