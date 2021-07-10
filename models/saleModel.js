const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne( { itensSold } ))
    .then((result) => (result.ops[0]));
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const intensSold = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  if (!intensSold) return null;

  return intensSold;
};

const update = async (saleId, itensSold) => {
  if (!ObjectId.isValid(saleId)) return null;
  await connection().then((db) => db.collection('sales')
    .updateOne({ _id: new ObjectId(saleId) }, { $set: { itensSold } })
  );
  return { _id: saleId, itensSold};
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};