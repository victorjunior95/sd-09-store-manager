const connection = require('../Helpers/connect');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  return connection().then(
    db => db.collection('sales').find().toArray()
  );
};

const getOneSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then(
    db => db.collection('sales').findOne( { _id: ObjectId(id) })
  );
};

const getAllProducts = async () => {
  return connection().then(
    db => db.collection('products').find().toArray()
  );
};
const updateById = async (id, products) => {
  return connection().then(
    db => db.collection('sales')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { itensSold: products } })
  ).then(() => ({ _id: id, itensSold: products }));
};



const createSale = async (products) => {
  return connection().then(
    db => db.collection('sales').insertOne({ itensSold: [...products] })
  ).then((result) => result.ops[0]);
};

const deleteSale = async (id) => {
  return connection().then(
    db => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) })
  );
};

module.exports = {
  getAllSales,
  createSale,
  getOneSale,
  getAllProducts,
  updateById,
  deleteSale,
};