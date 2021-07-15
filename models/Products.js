const connection = require('./connection');

async function fetchProduts(name) {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
}

async function create(name, quantity) {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
  // return result.ops[0];
  // .then((result) => ({ _id: result.insertedId, name, quantity }));
};

module.exports = {
  fetchProduts,
  create,
};
