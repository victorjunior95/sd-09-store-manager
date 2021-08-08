const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => 
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((result) => ({ sales: result }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
  return sale;
};

const newSale = async (sales) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result.ops[0]);
};

const updateSale = async (saleId, sale) => {
  if (!ObjectId.isValid(saleId)) return null;
  return connection()
    .then((db) => db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(saleId) },
        { $set: { itensSold: sale }}))
    .then(() => ({ _id: saleId, itensSold: sale}));
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id)}))
    .then((result) => result.value);
};

module.exports = {
  getAll,
  findById,
  newSale,
  updateSale,
  deleteSale,
};