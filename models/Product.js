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

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const _id = ObjectId(id);
  const product = await connection()
    .then((db) => db.collection('products').findOne({_id}));
  console.log('product na model: ' + product);
  if (!product) return null;
  return formatProduct(product);
};

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find());
  const result = await products.toArray();
  console.log('result: ' + result);
  console.log('products: ' + products);
  return result.map(formatProduct);
};

module.exports = { create, findByName, getAll, findById };
