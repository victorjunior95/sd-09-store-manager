// const { MongoClient } = require('mongodb');
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';
let db = null;

// const connection = () => {
//   return db
//     ? Promise.resolve(db)
//     :MongoClient.connect(MONGO_DB_URL, OPTIONS)
//       .then((conn) => {
//         db = conn.db(DB_NAME);
//         return db;
//       });
// };

const { MongoClient } = require('mongodb');
// const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
connection = () =>
  MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then ((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    }
    );

module.exports = connection;
