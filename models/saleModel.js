const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

/* GET */
const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales')
      .find().toArray());
};

/* GET */
const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };

  return await connection()
    .then((db) => db.collection('sales')
      .findOne(ObjectId(id)));
};

/* POST */
const create = async (sales) => {
  const sale = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold: sales }));
  return sale.ops[0];
};

/* PUT */
const update = async ( id, sale ) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };

  const result = await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale }}));
  return result;
};

/* DELETE */
const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };

  return connection()
    .then((db) => db.collection('sales')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};
