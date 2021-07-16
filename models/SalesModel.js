const connection = require('./connection');
const { ObjectId } = require('mongodb');


const addSale = async (soldItens) => {
  const data = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: soldItens}));

  return data;
};

const getAllSales = async () => {
  const data = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return {
    sales: data,
  };
};

const findById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const checkIfSalesExist = async ({id}) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({id}));

  return sale;
};

const editSale = async ({id, itensSold}) => {
  const newData = await connection().then((db) =>
    db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    )
  );
  return { _id: id, itensSold };
};

const deleteSale = async (id) => {
  const deleted = await connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }));
  return deleted.value;
};

module.exports = {
  checkIfSalesExist,
  getAllSales,
  deleteSale,
  findById,
  editSale,
  addSale,
};
