const {ObjectId} = require('mongodb');
const connect = require('./connection');

// Req05
const addNewSale = async(itensSold) =>
  connect().then(async(db) => {
    const addSale = await db.collection('sales').insertOne({ itensSold });
    return addSale.ops[0];
  });

// Req06
const getAllSales = async() =>
  connect().then(async(db) => await db.collection('sales').find().toArray());

// Req06
const getByIdSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const product = connect()
    .then(async(db) => await db.collection('sales').findOne(ObjectId(id)));
  return product;
};

// Req07
const updateIdSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const sale = connect()
    .then(async(db) => await db.collection('sales')
      .updateOne({_id: ObjectId(id)}, {$set:{ itensSold }}));
  return {_id: id, itensSold};
};

//Req08
const removeSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const remove = connect()
    .then(async(db) => await db.collection('sales')
      .deleteOne({_id: ObjectId(id)}));
  return remove;
};

module.exports = { addNewSale, getAllSales, getByIdSale, updateIdSale, removeSale };