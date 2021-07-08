const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (product) => {
  const { name, quantity } = product;
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: result.ops[0]._id,
    name: result.ops[0].name,
    quantity: result.ops[0].quantity
  };
};

const findByName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ 'name': name });
  return result;
};

const findAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return { products: result };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('products').findOne(new ObjectId(id));
  return result;
};

const update = async (product) => {
  const { id, name, quantity } = product;
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('products').updateOne(
    {_id: ObjectId(id)},
    {$set: {name, quantity}}
  );
  return { id, name, quantity };
};

module.exports = {
  create,
  findByName,
  findAll,
  findById,
  update,
};