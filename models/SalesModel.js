const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const addNewSales = async (itensSold) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('sales').insertOne( {itensSold} ),
  );
  return ({ _id: insertedId, itensSold });
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const products = await connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)),
  );
  if(!products) return false;

  return products;
};

const updateSale = async ( id, quantity) => {
  if (!ObjectId.isValid(id)) return false;

  const productUpdated = await connection().then((db) =>
    db.collection('sales').updateOne({id: ObjectId(id)},{$set: {quantity}})
  );

  return productUpdated;
};


module.exports = {
  addNewSales,
  getAll,
  findById,
  updateSale
};
