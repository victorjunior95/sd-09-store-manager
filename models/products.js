// Req 1 => Querys com o mongodb
const connection = require('./connection');

const create = async(name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}));
  const createProduct = { _id: insertedId, name, quantity };
  return createProduct;
};

const findByName = async (name) => {
  const productByName = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return productByName;
};

module.exports = {
  findByName,
  create,  
};
