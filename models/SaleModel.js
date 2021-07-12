const connection = require('./connection');

async function create(data) {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: data }))
    .catch((err) => err);
}

module.exports = { create };