const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function addSales(products) {
  const value = await connection()
    .then(db => db.collection('sales').insertOne(
      { itensSold: products }
    ));

  return value;
};

async function findSales() {
  const value = await connection()
    .then(db => db.collection('sales').find().toArray());

  return value;
};

async function findSalesId(id) {
  const value = await connection()
    .then(db => db.collection('sales').findOne(new ObjectId(id)));

  return value;
};

const updateSales = async (id, sale) => {
  const retorne = await connection()
    .then(db => db.collection('sales').updateOne(
      { _id: new ObjectId(id) }, { $set: { itensSold: sale } }
    ));

  return retorne;
};

const deleteSales = async (id) => {
  const result = await connection()
    .then(db => db.collection('sales').deleteOne(
      { _id: new ObjectId(id) }
    ));

  return result;
};

module.exports = {
  addSales,
  findSales,
  findSalesId,
  updateSales,
  deleteSales
};
