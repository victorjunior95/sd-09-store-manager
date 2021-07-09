const connection = require('./connection');

const addSale =  async (itensSold) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}));
  return sale.ops[0];
};

const findAllSales = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return sales;
};

const findOneSale = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({_id: id}));
  return sale;
};

const updateOneSale = async (idSale, idProduct, quantityProduct ) => {
  // const sale = await connection()
  //   .then((db) => db.collection('sales').updateMany(
  //     { _id: id },
  //     { $set: { itensSold: arrayOfProducts } },
  //     { upsert: true }))
  //   .then(() => ({ id, arrayOfProducts }));
  const sale = await connection()
    .then((db) => db.collection('sales').updateOne(
      {_id: idSale},
      { $set: {'itensSold.$[element].quantity': quantityProduct},},
      { arrayFilters: [{'element.productId': idProduct}], upsert: true}));
  return sale;
};

module.exports = {
  addSale,
  findAllSales,
  findOneSale,
  updateOneSale,
};
