const connection = require('./connection');
const { ObjectId } = require('mongodb');

const formatProduct = ({name, quantity, _id}) => {
  return {
    _id,
    name,
    quantity,
  };
};

const create = async (name, quantity) => {
  const db = await connection();
  const createNew = await db.collection('products').insertOne({name, quantity}); 
  const result = await createNew.ops[0];
  return formatProduct(result);
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));
  if (!product) return null;
  return formatProduct(product);
};

module.exports = { create, findByName };
