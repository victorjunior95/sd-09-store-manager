const connection = require('./connections');
const { ObjectId } = require('mongodb');
const { updateProductSale } = require('./products');

const createSalesModel = async (salesData) => {
  await removeItemFromStock(salesData);
  // if (stockData.error) return stockData;
  return await connection()
    .then(db => db.collection('sales')
      .insertOne({ itensSold: salesData }))
    .then(result => result.ops[0]);
};

const removeItemFromStock = async (salesData) => {
  return salesData.map(async product => {
    const saleInfo = { action: 'remove', product };
    const result = await updateProductSale(saleInfo);
    if (result === '404') return { error: 404 };
    return result;

  });
};
const addItemToStock = async (id) => {
  const salesData = await connection()
    .then(db => db.collection('sales')
      .findOne({ _id: ObjectId(id) }))
    .then(sale => sale.itensSold);
  salesData.map(product => {
    const saleInfo = { action: 'add', product };
    return updateProductSale(saleInfo);
  });
};

const listSalesModel = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray());
};

const saleByIdModel = async (id) => {
  return await connection()
    .then(db => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const saleUpdateModel = async (saleData) => {
  const { id, itensSold } = saleData;
  return await connection()
    .then(db => db.collection('sales').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: itensSold } },
      { returnOriginal: false }
    ))
    .then(result => result.value);
};

const saleDeleteModel = async (id) => {
  await (addItemToStock(id));
  return await connection()
    .then(db => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

const verifyStockModel = async (salesData) => {
  const { productId } = salesData;
  const availableStock = await connection()
    .then(db => db.collection('products').findOne(ObjectId(productId)));
  return availableStock.quantity;
};

module.exports = {
  createSalesModel,
  listSalesModel,
  saleByIdModel,
  saleUpdateModel,
  saleDeleteModel,
  verifyStockModel,
};
