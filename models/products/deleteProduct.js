const { ObjectID } = require('mongodb');
const connection = require('../connect');
const findProduct = require('./findProduct');


const deleteProduct = async (id) => {
  const db = await connection();
  const result = await findProduct(id);
  await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return result;
};

module.exports = deleteProduct;