const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findProductbyName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((product) => product);
};

const create = async (name, quantity) => {
  return connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (!product) return null;

  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
    .then(() => ({ _id: id, name, quantity }))
  );
};

const deleteProduct = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await getById(id);
  await connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));
  return product;
};

const subtractQuantity = async (id, quantity) => await connection()
  .then((db) => db.collection('products')
    .updateMany(
      { _id: ObjectId(id) },
      { $inc: { quantity: - quantity } }
    ));

module.exports = {
  create,
  findProductbyName,
  getAll,
  getById,
  update,
  deleteProduct,
  subtractQuantity,
};