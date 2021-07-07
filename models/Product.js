const connection = require('./connection');
const { ObjectId } = require('mongodb');

function create (name, quantity) {
  return connection().then((db) =>
    db.collection('products').insertOne({ name,quantity }))
	  .then((result) => ({ _id: result.insertedId, name, quantity }));
}

function getAll() {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((results) => results);
}

async function getByName(name) {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((results) => results);
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (!product) return null;

  return product;
};

async function update(id, name, quantity) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }, 
    { returnOriginal: false}
  );

  if (!product) return null;

  return product.value;
};

// Referência:
// https://github.com/tryber/sd-08-store-manager/pull/95/files

async function deleteOne(id) {
  return await connection().then(db => db.collection('products').deleteOne(
    { _id: ObjectId(id) }
  ));
};

// Referência:
// https://github.com/cleytonoliveira/store-manager/blob/main/models/ProductsModel.js
const subtractQuantity = async (id, quantity) => await connection()
  .then((db) => db.collection('products')
    .updateMany(
      { _id: ObjectId(id) },
      { $inc: { quantity: - quantity } }
    ));
const sumQuantity = async (id, quantity) => await connection()
  .then((db) => db.collection('products')
    .updateMany(
      { _id: ObjectId(id) },
      { $inc: { quantity: quantity } },
    ));

module.exports = {
  getAll,
  create,
  getByName,
  findById,
  update,
  deleteOne,
  subtractQuantity,
  sumQuantity
}; 