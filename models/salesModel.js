const connection = require('./connection');

const salesCollection = 'sales';

const postNewSales = async (soldItens) => {
  const data = await connection().then((db) =>
    db.collection(salesCollection).insertOne({ itensSold: soldItens })
  );
  return  data;
};


module.exports = {
  postNewSales,
};