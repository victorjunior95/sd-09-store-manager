const connection = require('./connection');

const { ObjectId } = require('mongodb');

const COLLECTION = 'products';

const addProduct = async (productData) => {
  const { name, quantity } = productData;

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await productsCollection.insertOne({
    name,
    quantity,
  });

  return { _id, name, quantity };
};

const getProductByName = async (name) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return await productsCollection.findOne({ name });
};

const getProducts = async () => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return await productsCollection.find({}).toArray();
};

const getProductById = async (id) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return await productsCollection.findOne({ _id: ObjectId(id) });
};

const updateProduct = async (id, updatedProduct) => {
  const { name, quantity } = updatedProduct;

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return await productsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity} },
  );
};

module.exports = {
  addProduct,
  getProducts,
  getProductByName,
  getProductById,
  updateProduct,
};
