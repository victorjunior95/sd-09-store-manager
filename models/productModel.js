const connection = require('./connection');
const { ObjectId } = require('mongodb');

const hexValue = 24;

const findName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  return product;
};

const create = async (name, quantity) => {
  const productCreated = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return productCreated.ops[0];
};

const showAll = async () => {
  const list = await connection()
    .then((db) => db.collection('products').find({}).toArray());

  return list;
};

const findId = async (id) => {
  if(id.length !== hexValue) return null;

  const product = await connection()
    .then((db) => db.collection('products').findOne({ _id: new ObjectId(id) }));

  return product;
};

const update = async (id, name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, quantity } } ));
  
  const revisonProduct = await connection()  
    .then((db) => db.collection('products').findOne({ name }));

  return product && revisonProduct;
};

// apaga produto
const drop = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: new ObjectId(id) }));

  return product;
};

module.exports = {
  create,
  findName,
  showAll,
  findId,
  update,
  drop,
};
