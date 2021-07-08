const connection = require('./connectionMongoDB');
const { ObjectId } = require('mongodb');

const findProductByName = async (productName) => {
  const result = await connection()
    .then((db) => db.collection('products').find({ name: productName }).toArray());
  return result; 
};

const createProduct = async (data) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne(data));

  return result.ops[0];
};

const getProductById = async (productId) => {
  if (!ObjectId.isValid(productId)) {
    return null;
  }

  const result = await connection()
    .then((db) => db.collection('products')
      .findOne({ _id: new ObjectId(productId) }));

  if (!result) return null;

  return result;
};

const getProductsAll = async () => {
  const result = await connection()
    .then((db) => db.collection('products').find({}).toArray());
    
  return { products: result };
};

const updateProductById = async (productId, data) => {
  const { name, quantity } = data;
  if (!ObjectId.isValid(productId)) {
    return null;
  }

  const result = await connection()
    .then((db) => db.collection('products')
      .updateOne(
        { _id: new ObjectId(productId) },
        { $set: { name: name, quantity: quantity } }
      ));

  return ({ ...data, _id: productId });
};

const deleteProductById = async (productId) => {
  if (!ObjectId.isValid(productId)) {
    return null;
  }

  const result = await connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: new ObjectId(productId)}));

  if (!result) return null;
  return result;
};

module.exports = {
  findProductByName,
  createProduct,
  getProductById,
  getProductsAll,
  updateProductById,
  deleteProductById,
};
