const { ObjectId } = require('mongodb');
const conn = require('./connections');

const addProductDB = async (name, quantity) => {
  const db = await conn();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

const getByNameDB = async (name) => {
  const db = await conn();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getAllProductsDB = async () => {
  const db = await conn();
  const productsList = await db.collection('products').find().toArray();
  return { products: productsList };
};

const getProductByIdDB = async (id) => {
  const db = await conn();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const editProductDB = async (id, name, quantity) => {
  const db = await conn();

  const newProduct = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id)}, { $set: { name, quantity } });
  
  if (newProduct.result.ok == 1) return { id, name, quantity };

  return null;
};

const deleteProductDB = async (id) => {
  const db = await conn();
  const foundProduct = await getProductByIdDB(id);

  if (foundProduct) {
    db.collection('products').deleteOne({ _id: ObjectId(id) });
    return foundProduct;
  }

  return null;
};

const updateStock = async (productId, quantity) => {
  const db = await conn();
  await db
    .collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: quantity } });
};

module.exports = {
  addProductDB,
  getByNameDB,
  getAllProductsDB,
  getProductByIdDB,
  editProductDB,
  deleteProductDB,
  updateStock,
};
