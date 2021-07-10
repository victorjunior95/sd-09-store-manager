const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getNewSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((products) => {
      return products.map(({ _id, name, quantity }) => {
        return ({
          _id,
          name,
          quantity,
        });
      });
    });
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const createSales = async (sales) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...sales] }));
};

const updateSales = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) },
        { $set: { itensSold } }),
    )
    .then(() => ({ _id: id, itensSold }));
};

const deleteSales = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllSales,
  createSales,
  getNewSales,
  getById,
  updateSales,
  deleteSales,
};