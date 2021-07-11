const { ObjectId } = require('mongodb');
const connection = require('./connection');
const collectionSales = 'sales';

const create = async (itensSold) => {

  const newSale = await connection().then((db) =>
    db.collection(collectionSales).insertOne({ itensSold }));

  return newSale.ops[0];
};

const listAll = async () => {
  const salesAll = await connection().then((db) =>
    db.collection(collectionSales).find({}).toArray());
  return salesAll;
};

const listSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const saleById = await connection().then((db) =>
    db.collection(collectionSales).findOne(new ObjectId(id)),
  );

  if (!saleById) return null;
  return saleById;
};

module.exports = { 
  create,
  listAll,
  listSaleById
};