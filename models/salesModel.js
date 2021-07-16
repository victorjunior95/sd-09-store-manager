const { ObjectId } = require('mongodb');
const connection = require('./connection');

const salesCollection = 'sales';

const postNewSales = async (soldItens) => {
  const data = await connection().then((db) =>
    db.collection(salesCollection).insertOne({ itensSold: soldItens })
  );
  return  data;
};

const getAllSales = async () => {
  const data = await connection().then((db) =>
    db.collection(salesCollection).find().toArray()
  );
  return {
    sales: data,
  };
};

const checkIfSalesExist = async ({ id }) => {
  const data = await connection().then((db) =>
    db.collection(salesCollection).findOne({ id }),
  );
  return data;
};

const getSalesById = async (id) => {
  const data = await connection().then((db) =>
    db.collection(salesCollection).findOne(ObjectId(id))
  );
  return data;
};


module.exports = {
  postNewSales,
  getAllSales,
  getSalesById,
  checkIfSalesExist,
};