const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const setNew = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}));
  
  return { _id: insertedId, itensSold };
};

const findByName = async (name) => connection()
  .then((db) => db.collection('sales').findOne({ name }));

const findById = async (id) => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const deleteById = async (id) => connection()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

const updateById = async (id, itensSold) => connection()
  .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, 
    { $set: { itensSold } }));

module.exports = { 
  getAll, 
  setNew, 
  findByName, 
  findById,
  deleteById, 
  updateById 
};
