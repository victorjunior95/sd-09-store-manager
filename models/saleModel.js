const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getNewSale = (productData) => {
  const {_id, productId, quantity } = productData;

  return {
    _id,
    productId,
    quantity,
  };
};

const createSale = async (products) => {
  return connection()
    .then((db) => db.collection('sales').insertMany([{itensSold: [...products]}])
      .then((result) => result.ops[0]));
};

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
};

const updateSale = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales')
      .updateOne({_id: ObjectId(id)}, {$set: {productId, quantity}})
      .then(() => getNewSale({_id: id, productId, quantity})));
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection('sales').findOneAndDelete({_id: ObjectId(id)}));
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};


