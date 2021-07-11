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

const findByIdAndUpdate = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  };
  const updated = await connection()
    .then(db => 
      db
        .collection('products')
        .updateOne({_id: ObjectId(id)}, {$set: {name, quantity} })
    );
  return {_id: id, name, quantity};
};

const findByIdAndRemove = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  };
  const removed = await connection()
    .then(db => db.collection('products').deleteOne({_id: ObjectId(id)}));
  return removed;
};

module.exports = {
  create,
  findOne,
  findAll,
  findById,
  findByIdAndUpdate,
  findByIdAndRemove,
};