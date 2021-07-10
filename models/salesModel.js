const connection = require('./connection');
const { ObjectId } = require('mongodb');


const create = async (productsArray) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: productsArray }))
  .then(({ ops }) => ({ _id: ObjectId(ops[0]._id), itensSold: ops[0].itensSold }));

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray())
  .then((salesArray) => salesArray.map(({ _id, itensSold }) => ({ _id, itensSold })));

const getById = async (id) => {
  console.log('getById MODEL <<<<<<<<<<<<<<<<');

  if (!ObjectId.isValid(id)) return null;

  console.log('getById MODEL >>>>>>>>>>>>>>>>>>>');
  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .then(db => db);
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('sales').deleteOne(ObjectId(id)));
};

module.exports = {
  create,
  getAll,
  getById,
  deleteSale,
};
