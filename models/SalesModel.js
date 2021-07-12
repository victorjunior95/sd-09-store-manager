const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sales) => {
  const newSales = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
  return newSales.ops[0];
};


const getAll = async () => {
  const getAll = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return getAll;
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const findProduct = await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}));

  return findProduct;
};

const updateSale = async (id, itensSold) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const sale = await connection()
    .then((db) => db.collection('sales')
      .findOneAndUpdate(
        {_id: ObjectId(id)},
        { $set: { itensSold }},
        { returnOriginal: false }
      )
    ).then((result) => result.value );

  return sale;
};

const deleteSale = async(id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const sale = await connection()
    .then((db) => db.collection('sales').findOneAndDelete({_id: ObjectId(id)}))
    .then((result) => result.value );

  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  updateSale,
  deleteSale
};