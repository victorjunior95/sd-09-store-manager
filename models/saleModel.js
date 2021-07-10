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

  const itensSold = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  if (!itensSold) return null;

  return itensSold;
};

const update = async (id, itensSold) =>  {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const saleUpdate = await db.collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } }, 
      { returnOriginal: false}
    );

  if (!SaleUpdate) return null;

  return saleUpdate;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};