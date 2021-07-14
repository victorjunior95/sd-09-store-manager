const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productsCollection = 'products';

const getAllProducts = async () => {
  const data = await connection().then((db) => 
    db.collection(productsCollection).find().toArray(),
  );

  return { 
    products: data
  };
};

const getProductById = async (id) => {
  const data = await connection().then((db) => 
    db.collection(productsCollection).findOne(new ObjectId(id))
  );

  if (!data) return null;

  return data;
};

const postProduct = async ({ name, quantity }) => {
  const newProduct = await connection().then((db) =>
    db.collection(productsCollection).insertOne({ name, quantity })
  );

  return newProduct.ops[0];
};


module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
};