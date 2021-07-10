const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne(itensSold);
  return result.ops[0];
};

const findAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
  return result;
};

const update = async (id, products) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { itensSold: products } },
    { returnOriginal: false }
  );
  return result.value;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const deletedProduct = await db.collection('sales').findOne(new ObjectId(id));
  if (deletedProduct === null) return null;
  await db.collection('sales').findOneAndDelete({_id: ObjectId(id)});
  return deletedProduct;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};
