const connection = require('./connection');

const addProduct =  async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return product.ops[0];
};

const findOneProductByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));
  return product;
};

const findOneProductById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({_id: id}));
  return product;
};

const findAllProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

module.exports = {
  addProduct,
  findOneProductByName,
  findOneProductById,
  findAllProducts,
};
