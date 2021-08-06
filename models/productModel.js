const connection = require('./connections');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return newProduct.ops[0];
};
const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  if (!product) return null;

  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const updateProduct = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
    { returnOriginal: false }
  );

  if (!updateProduct) return null;

  return updateProduct.value;
};

const destroy = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productDeleted = await getById(id);

  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return productDeleted;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};
