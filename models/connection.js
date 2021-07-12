const { MongoClient } = require('mongodb');

// Teste local
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// Teste avaliador
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

connection = () =>
  MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });



module.exports = connection;

// const OPTIONS = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };


// const DB_NAME = 'StoreManager';

// let db = null;

// const connection = () => {
//   return db
//     ? Promise.resolve(db)
//     : MongoClient.connect(MONGO_DB_URL, OPTIONS)
//       .then((conn) => {
//         db = conn.db(DB_NAME);
//         return db;
//       });
// };