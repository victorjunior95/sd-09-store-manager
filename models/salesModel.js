const connection = require('./connection');

const { ObjectId } = require('mongodb');


const create = async (salesArray) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  // const sales = await salesCollection
  //   .insertMany(salesArray).then((result) => result);
  const sales = await salesCollection
    .insertOne({itensSold: salesArray}).then((result) => result.ops[0]);
  console.log(sales, 'model');
  return {
    sales
  };
};

const getAll = async () => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const sales = await salesCollection.find().toArray();

  return sales;
};

const getById = async (id) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));
  const sale = await salesCollection.findOne(new ObjectId(id));

  return sale;
};



const findProductId = async (id) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  const product = await productsCollection.findOne(new ObjectId(id));
  return product;
};

module.exports = {
  create,
  findProductId,
  getAll,
  getById
};
