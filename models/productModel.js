const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

/* GET */
const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products')
      .find().toArray());
};

/* GET */
const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };

  return await connection()
    .then((db) => db.collection('products')
      .findOne(ObjectId(id)));
};

/* GET */
const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products')
      .findOne({ name }));
};

/* POST */
const create = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .insertOne({name, quantity}));
  return { _id: product.insertedId, name, quantity};
};

/* PUT */
const update = async ( id, name, quantity ) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };

  const product = await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }}));
  return product;
};

/* DELETE */
const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };

  return connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  exclude
};
