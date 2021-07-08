const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://localhost:27017';
const connection = () => {
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;