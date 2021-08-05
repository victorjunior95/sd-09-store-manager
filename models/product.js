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
  await connection()
    .then(db => db.collection('products').updateOne(
      { _id: new ObjectId(id) }, { $set: { name, quantity } }
    ));

  return {id, name, quantity };
};

const somaProducts = async (id, value) => {
  await connection()
    .then(db => db.collection('products').updateOne(
      { _id: new ObjectId(id) }, { $inc: { quantity: - value } }
    ));
};

const subProducts = async (id, value) => {
  await connection()
    .then(db => db.collection('products').updateOne(
      { _id: new ObjectId(id) }, { $inc: { quantity: value } }
    ));
};

const deleteProduct = async (id) => {
  const result = await connection()
    .then(db => db.collection('products').deleteOne(
      { _id: new ObjectId(id) }
    ));
  return result;
};


module.exports = {
  create,
  findProductName,
  findProductId,
  findProductAll,
  updateProduct,
  deleteProduct,
  somaProducts,
  subProducts,
};