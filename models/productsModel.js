const connection = require('./connection');
const { ObjectId } = require('mongodb');
// função que valida o "_id" do mongoDB

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

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  console.log(product);
  return product;
};

module.exports = {
  getProductByName,
  createProduct,
  getAllProducts,
  getProductById,
};
