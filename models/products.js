const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const create =  async (name, quantity) => {
  const newProduct =  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}))
    .then((result) => result.ops[0]);

  return {
    _id: newProduct._id,
    name,
    quantity,
  };
};

const edit = (id, name, quantity) => {
  if(!ObjectID.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('products').updateOne({ _id: ObjectID(id) },
      { $set: { name, quantity }}))
    .then(() => ({ id, name, quantity }));
};

const getByName = (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const getAll = () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }))
    .catch(() => null);
};
 
module.exports = {
  create,
  edit, 
  getAll,
  getByName,
  getById,
};