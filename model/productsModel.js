const connection = require('./connectionMongoDB');

const findProductByName = async (productName) => {
  const result = await connection()
    .then((db) => db.collection('products').find({ name: productName}).toArray());
  return result; 
};

const createProductsModel = async (data) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne(data));
  return result.ops[0];
};

module.exports = {
  findProductByName,
  createProductsModel,
};
