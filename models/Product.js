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
  if (!product) return null;
  return formatProduct(product);
};

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find());
  const result = await products.toArray();
  return result.map(formatProduct);
};

const edit = async (id, name, quantity) => {
  const db = await connection();
  const _id = ObjectId(id);
  const edit = await db.collection('products')
    .updateOne({_id}, {$set: {name, quantity}}); 
  const edited = await findById(id);
  return formatProduct(edited);
};

const deleteOne = async (id) => {
  const db = await connection();
  const _id = ObjectId(id);
  const deleted = await findById(id);
  const deleting = await db.collection('products')
    .deleteOne({_id}); 
  return formatProduct(deleted);
};

module.exports = { create, findByName, getAll, findById, edit, deleteOne };
