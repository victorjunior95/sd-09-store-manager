const connection = require('./connection');

const PRODUCTS = 'products';

const create = async (name, quantity) => {
  const db = await connection();
  return db.collection(PRODUCTS).insertOne({
    name,
    quantity,
  });
};

const getAll = async () => {
  const db = await connection();
  return db.collection(PRODUCTS).find().toArray();
};

const getProductByName = async (name) => {
  const db = await connection();
  return db.collection(PRODUCTS).findOne({ name });
};

const getProductById = async (id) => {
  const db = await connection();
  return db.collection(PRODUCTS).findOne({ _id: id });
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  db.collection(PRODUCTS).updateOne(
    { _id: id },
    { $set: { name, quantity } }
  );
  return ({ _id: id, name, quantity });
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);
  const db = await connection();
  db.collection(PRODUCTS).deleteOne({ _id: id });
  return product;
};

const getProductsByIds = async (ids) => {
  const db = await connection();
  return db.collection(PRODUCTS).find({ _id: { $in: ids } }).toArray();
};

module.exports = {
  create,
  deleteProduct,
  getAll,
  getProductByName,
  getProductById,
  getProductsByIds,
  updateProduct,
};
