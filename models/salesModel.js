const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findAll = async () => {
  const sales = await connection().then((db) => db.collection('sales')
    .find().toArray());
  return {sales: [...sales]};
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection().then((db) => db.collection('sales')
    .findOne(ObjectId(id)));

  if (!sale) return null;
  return sale;
};

const create = async (itensSold) => {
  const newSale = await connection().then((db) => db.collection('sales')
    .insertOne({ itensSold }));
  return newSale.ops[0];
};

const update = async ({ id, itensSold }) => {
  if (!ObjectId.isValid(id)) return null;

  const setSale = await connection().then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  if (!setSale) return null;
  return setSale;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await findById(id);
  if (!sale) return null;

  await connection().then((db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
  return sale;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  exclude,
};