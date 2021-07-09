const { ObjectId } = require('mongodb');
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

const getAllProducts = async () => {
  const allProducts = await connection().then((db) =>
    db.collection('products').find().toArray());
  console.log(allProducts);
  return allProducts;
};

const getProductById = async (id) => {
  const product = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)));
  console.log(product);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const updateProduct = await connection().then((db) =>
    db.collection('products')
      .findOneAndUpdate({ _id: ObjectId(id) }, {
        $set: {
          name,
          quantity,
        }},
      { returnOriginal: false }
      )
      .then(result => result.value));
  return updateProduct;
};

module.exports = {
  registerProduct,
  findProductByName,
  getAllProducts,
  getProductById,
  updateProduct
};
