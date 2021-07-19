const { MongoClient } = require('mongodb');

const DB = 'StoreManager';
const URL = 'mongodb://mongodb:27017/StoreManager';

// Testes locais
// const URL = 'mongodb://127.0.0.1:27017/StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connection = async () => {
  return MongoClient.connect(URL, OPTIONS)
    .then((conn) => conn.db(DB))
    .catch((err) => {
      console.log(err);
      process.exit();
    }
    );
};

module.exports = connection;
