const connection = require('./connections');
const { ObjectId } = require('mongodb');

const createSales = async (newSales) => {
  const result = await connection()
    .then((db) => db
      .collection('sales')
      .insertOne({ itensSold: newSales }));
  return result.ops[0];
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db
      .collection('sales')
      .find()
      .toArray())
    .then((result) => ({ sales: result }));
};

const getByIdSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db
      .collection('sales')
      .findOne(ObjectId(id)));
};

const updateSale = async (id, updates) => {
  if (!ObjectId.isValid(id)) return null;
  await connection()
    .then((db) => db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold: updates } }
      ));
  return { _id: id, itensSold: updates };
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db
      .collection('sales')
      .findOneAndDelete({ _id: ObjectId(id) }));
  return result.value;
};

module.exports = {
  createSales,
  deleteSale,
  getAllSales,
  getByIdSale,
  updateSale,
};
