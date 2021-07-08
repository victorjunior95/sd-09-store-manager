const connection = require('./connection');

const addProduct =  async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return product.ops[0];
};

const findOneProduct = async (objSearch) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(objSearch));
  return product;
};

const findAllProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

module.exports = {
  addProduct,
  findOneProduct,
  findAllProducts,
};
