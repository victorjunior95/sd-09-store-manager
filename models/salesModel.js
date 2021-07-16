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

const upDateSale = async ({ id, itensSold }) => {
  const newData = await connection().then((db) => 
    db.collection(salesCollection).updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    )
  );
  return { _id: id, itensSold };
};

const deleteSale = async (id) => {
  const deletedData = await connection().then((db) => 
    db.collection(salesCollection).deleteOne({ _id: ObjectId(id) })
  );
  return deletedData;
};

module.exports = {
  postNewSales,
  getAllSales,
  getSalesById,
  checkIfSalesExist,
  upDateSale,
  deleteSale,
};