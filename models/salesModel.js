const mongodb = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { getProductById } = require('./productsModel');

const postNewSale = async (saleArray) => {
  for ( const item of saleArray ) {
    const product = await getProductById(ObjectId(item.productId));
    if (!product) return null;
  };
  
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: saleArray}));

  return result.insertedId;
};

module.exports = {
  postNewSale,
};
