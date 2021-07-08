const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findProductbyName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((product) => product);
};

const create = async (name, quantity) => {
  return connection().then((db) =>
    db.collection('products').insertOne({ name,quantity }))
	  .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (!product) return null;

  return product;
};

module.exports = { 
  create, 
  findProductbyName,
  getAll,
  getById,
};