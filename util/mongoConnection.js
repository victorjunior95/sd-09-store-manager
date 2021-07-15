const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'StoreManager';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db;

const mongoConnection = () => {
  return db ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then(conn => {
        db = conn.db(DB_NAME);
        console.log('Banco de dados conectado!');
        return db;
      })
      .catch(err => {
        console.log(`Erro na conxão com o banco: ${err}`);
      });
};

module.exports = mongoConnection;