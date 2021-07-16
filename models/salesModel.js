const connection = require('../config/conn');
const {ObjectId} = require('mongodb');

const create = async (itemSold) => {
  // const newSales = await connection()
  //   .then(db => db.collection('sales').insertOne({itensSold: items}));

  const newSales = await connection()
    .then((db) => db.collection('sales')
      .insertMany([{ itensSold: [...itemSold ] }]))
    .then((result) => result);

  return newSales.ops[0];
};

const validateProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;
  };
  if (connection()
    .then(db => db.collection('products').findOne(ObjectId(id)))) {
    return true;}
  else false;
};

const findAll = async () => {
  return connection()
    .then(db => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;};
  return await connection()
    .then(db => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, items) => {
  if (!ObjectId.isValid(id)) {
    return false;
  };
  const updateProduct = await connection()
    .then(db => 
      db
        .collection('sales')
        .findOneAndUpdate({_id: ObjectId(id)}, 
          {$set: {itensSold: [{productId: items.productId, quantity: items.quantity}]}})
    );
  return (updateProduct.value);
};

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;
  };
  return await connection()
    .then(db => db.collection('sales').deleteOne({_id: ObjectId(id)}));
};

module.exports = {
  create,
  validateProduct,
  findAll,
  findById,
  update,
  deleteSaleById,
};