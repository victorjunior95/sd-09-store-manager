const mongodb = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { getProductById, updateProduct } = require('./productsModel');

const checkStock = async (saleArray) => {
  for ( const item of saleArray ) {
    const product = await getProductById(ObjectId(item.productId));
    if (!product) return { err: { 
      code: 'invalid_data',
      message: 'Não existe produto com o Id fornecido'
    }};
    if (product.quantity < item.quantity) return { err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    }};
  };
  return {};
};

const updateProductWhenSold = async (saleArray) => {
  for ( const item of saleArray) {
    await connection().then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(item.productId)}, {$inc: {quantity: -item.quantity}}));
  };
};

const postNewSale = async (saleArray) => {
  const stockStatus = await checkStock(saleArray);

  if(stockStatus.err) return (stockStatus);

  await updateProductWhenSold(saleArray);

  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: saleArray}));

  return result.insertedId;
};

const getAllSales = async () => {
  const result = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return {
    sales: result
  };
};

const getSaleById = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
  return result;
};

const updateSale = async ({ id, itensSold }) => {
  const sale = await getSaleById(id);

  if (!sale) return null;

  const result = await connection()
    .then((db) => db
      .collection('sales')
      .updateOne({ _id: ObjectId(id)}, {$set: { itensSold }}));
  return result.modifiedCount;
};

const updateProductsWhenDeleted = async (itemSoldArray) => {
  for ( const item of itemSoldArray) {
    await connection().then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(item.productId)}, {$inc: {quantity: item.quantity}}));
  };
};

const deleteSale = async (id) => {
  const sale = await getSaleById(id);

  if(!sale) return null;

  await updateProductsWhenDeleted(sale.itensSold);

  const result = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id)}));
  return sale;
};

module.exports = {
  postNewSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
