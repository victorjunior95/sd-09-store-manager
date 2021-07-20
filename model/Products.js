const connection = require('./connection');

const createNewProduct = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => (result.ops[0])); //ou { _id: result.insertedId, name, quantity }

const findByName = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  if (!result) return null;
  return result;
};

module.exports = {
  createNewProduct,
  findByName,
};