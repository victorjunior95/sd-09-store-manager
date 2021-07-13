const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const setNew = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  
  return { _id: insertedId, name, quantity };
}; 

const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const findById = async (id) => await connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const deleteById = async (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

const updateById = async (id, name, quantity) => connection()
  .then((db) => db.collection('products').updateOne({ _id: ObjectId(id)}, 
    { $set: { name, quantity } },
  ));

const updateStockAmount = async (id, name, quantity) => connection()
  .then((db) => db.collection('products').updateMany({ _id: ObjectId(id)}, 
    { $set: { name, quantity } },
  ));

module.exports = { 
  getAll, 
  setNew, 
  findByName, 
  findById,
  deleteById, 
  updateById,
  updateStockAmount
};
