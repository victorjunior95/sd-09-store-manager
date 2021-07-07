const connection = require('./connection');

const create = async ({name, quantity}) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const { insertedId: id} = await productsCollection
    .insertOne({name, quantity});

  return {
    id,
  };
};

const getByName = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const exists = await productsCollection
    .find({'name': name}).toArray();
  return exists;
};

module.exports = {
  create,
  getByName
};
