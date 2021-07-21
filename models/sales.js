const connection = require('./connections');
const { ObjectId } = require('mongodb');

const createSalesModel = async (salesData) => {
  return await connection()
    .then(db => db.collection('sales')
      .insertOne({ itensSold: salesData }))
    .then(result => result.ops[0]);
};

const listSalesModel = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray());
};

const saleByIdModel = async (id) => {
  return await connection()
    .then(db => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const saleUpdateModel = async (saleData) => {
  const { id, itensSold } = saleData;
  return await connection()
    .then(db => db.collection('sales').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: itensSold } },
      { returnOriginal: false }
    ))
    .then(result => result.value);
};

module.exports = {
  createSalesModel,
  listSalesModel,
  saleByIdModel,
  saleUpdateModel,
};
