const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (productsSold) => {
  const db = await connection();
  const { ops: [sales] } = await db.collection('sales')
    .insertOne({ 'itensSold': productsSold });
  return sales;
};

const getAll = async () => {
  const db = await connection();
  return await db.collection('sales')
    .find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  return await db.collection('sales')
    .find({ _id: ObjectId(id) }).toArray();

};

const updateById = async (id, productId, quantity) => {
  const db = await connection();
  return await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { 'itensSold': { productId, quantity } } });
};

const deleteById = async (id) => {
  const db = await connection();
  const sale = await getById(id);
  await db.collection('sales')
    .deleteOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
