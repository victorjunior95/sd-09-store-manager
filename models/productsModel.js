const connection = require('./connection');

const addProduct = async (productData) => {
  const { name, quantity } = productData;

  const productsCollection = await connection().then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection.insertOne({
    name,
    quantity,
  });

  return { _id, name, quantity };
};

const getProductByName = async (name) => {
  const productsCollection = await connection().then((db) => db.collection('products'));

  return await productsCollection.findOne({ name });
};

const getProducts = async () => {
  const productsCollection = await connection().then((db) => db.collection('products'));

  const products = await productsCollection.find({}).toArray();

  return products;
};

module.exports = {
  addProduct,
  getProducts,
  getProductByName,
};
