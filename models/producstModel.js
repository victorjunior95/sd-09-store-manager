const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.insertOne({ name, quantity });
  const inserted = response.ops[0];
  return inserted;
};

const findOneByName = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.findOne({name});

  if (response) return response;

  return response;
};


module.exports = {
  create,
  findOneByName
};
