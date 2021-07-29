const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create(name, quantity) {
  const createProduct = await connection()
    .then(db => db.collection('products').insertOne({name, quantity}));

  return createProduct;
}

const findProductName = async (name) => {
  const findProduct = await connection()
    .then(db => db.collection('products').find({ name }).toArray());

  return findProduct;
};

const findProductId = async (id) => {
  const findProduct = await connection()
    .then(db => db.collection('products').findOne(new ObjectId(id)));

  return findProduct;
};

const findProductAll = async () => {
  const findProduct = await connection()
    .then(db => db.collection('products').find().toArray());

  return findProduct;
};

const updateProduct = async (id, name, quantity) => {
  const findProduct = await connection()
    .then(db => db.collection('products').updateOne(
      { _id: new ObjectId(id) }, { $set: { name, quantity } }
    ));

  return {id, name, quantity };
};

module.exports = {
  create,
  findProductName,
  findProductId,
  findProductAll,
  updateProduct,
};