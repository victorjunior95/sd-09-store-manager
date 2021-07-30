const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();
  const { ops: [product] } = await db.collection('products')
    .insertOne({ name, quantity });
  return product;
};

const getAll = async () => {
  const db = await connection();
  return  await db.collection('products')
    .find().toArray();
};

const getByIdOrName = async (id, name) => {
  const db = await connection();
  return await db.collection('products')
    .findOne({ $or: [{ _id: ObjectId(id) }, { name }] });
};

const updateById = async (id, name, quantity) => {
  const db = await connection();
  return await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
};

const deleteById = async (id) => {
  const db = await connection();
  const product = await getByIdOrName(id);
  await db.collection('products')
    .deleteOne({ _id: ObjectId(id) });
  return product;
};

const getByIds = async (productsSold) => {
  const ids = productsSold.map(({ productId }) => ObjectId(productId));
  const db = await connection();
  return await db.collection('products')
    .find({ _id: { $in: ids } }).toArray();
};

module.exports = {
  create,
  getAll,
  getByIdOrName,
  updateById,
  deleteById,
  getByIds
};
