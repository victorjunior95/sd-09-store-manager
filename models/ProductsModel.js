const connection = require('./connection');

const collection = async () => connection()
  .then((db) => db.collection('products'));

// const create = async (name, quantity) => collection()
//   .then((products) => products.insertOne({ name, quantity }));
const create = async (name, quantity) => collection()
  .then((coll) => coll.insertOne({ name, quantity }));

const findByQuery = async (query) => {
  const product = await collection()
    .then((coll) => coll.findOne(query));

  if (!product) return null;

  return product;
};

const getAll = async () => collection()
  .then((coll) => coll.find().toArray());

module.exports = {
  create,
  findByQuery,
  getAll,
};
