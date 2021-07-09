const connection = require('../connection');

const getAll = () => {
  const products = connection()
    .then((db) => db.collection('products').find().toArray());

  return products;
};

const searchProductName = async (searchName) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name: searchName }));
};

const createProducts = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  searchProductName,
  createProducts,
};
