const connection = require('./connection');

const registerProductModel = async (name, quantity) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.insertOne({name, quantity});
  return response.ops[0];
};


const existsProduct = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  
  const isAProduct = await productsCollection.findOne({ name });
  if(isAProduct) return true;

  return false;
};

module.exports = {
  registerProductModel,
  existsProduct,
};
