const connection = require('../config/conn');

const registerProduct = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

const findProductByName = async (name) => {
  const product = await connection().then((db) =>
    db.collection('products').findOne({ name: name }));
  return product;
};

module.exports = {
  registerProduct,
  findProductByName,
};
