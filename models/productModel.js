const connection = require('../config/conn');
const {ObjectId} = require('mongodb');

const create = async (name, quantity) => {
  const newProduct = await connection()
    .then(db => db.collection('products').insertOne({name,quantity}));
  //console.log(newProduct);
  return {_id: newProduct.insertedId, name, quantity};
};

const findOne = async (name) => {
  return connection()
    .then(db => db.collection('products').findOne({name}));
};

const findAll = async () => {
  return connection()
    .then(db => db.collection('products').find().toArray());
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  };
  return connection()
    .then(db => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  create,
  findOne,
  findAll,
  findById,
};