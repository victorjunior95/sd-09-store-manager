const connection = require('./connection');
const { ObjectId } = require('mongodb');
// valida o "_id" do mongoDB

const getProductByName = async (name) => {
  const db = await connection();
  const resultProduct = await db.collection('products').findOne({ name });
  return resultProduct;
};

const createProduct = async (product) => {
  const db = await connection();
  const insertProduct = await db.collection('products').insertOne(product);
  // o insertProduct.ops retorna um array que na posiçao zero tem a minha inserção
  return insertProduct.ops[0];
};

module.exports = {
  getProductByName,
  createProduct,
};
