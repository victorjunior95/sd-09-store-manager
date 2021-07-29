/*
  - Código retirado do bloco 27.1
https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-model/69147096-f19d-4ab4-a839-906359d79172/conteudos/a0fc476d-ac13-472b-907c-5c4b544fc21f/model-com-mongodb/a21d8bc1-7694-4fff-9b42-5187912a8d53?use_case=side_bar

*/

const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db('model_example');
        return db;
      });
};

module.exports = connection;
