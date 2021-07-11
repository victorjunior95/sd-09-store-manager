const connection = require('./connection');
const { ObjectId } = require('mongodb');
const ApiError = require('../errors/apiError');
const httpStatusCode = require('../httpStatusCodes');

const create = async (products) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const response = await salesCollection.insertOne({itensSold: products});
  const inserted = response.ops[0];
  return inserted;
};

const update = async(id, products) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const {value:{_id}} = await salesCollection
    .findOneAndUpdate({_id: ObjectId(id)}, {$set: {itensSold: products}});

  return {_id, itensSold: products};
};

const deleteOne = async(id) => {
  const productsCollection = await connection()
    .then((db) => db.collection('sales'));

  if(!ObjectId.isValid(id)) throw new ApiError('invalid_data',
    'Wrong sale ID format', httpStatusCode.unprocessableEntity);

  const {value} = await productsCollection.findOneAndDelete({_id: ObjectId(id)});

  if (!value) throw new ApiError('invalid_data',
    'Wrong sale ID format', httpStatusCode.unprocessableEntity);

  return value;

};

const findAll = async () => connection()
  .then((db) => db.collection('sales'))
  .then((collection) => collection.find().toArray())
  .then((sales) => ({ sales }));


const findOneById = async (id) => {

  if(!ObjectId.isValid(id)) throw new ApiError(
    'not_found',
    'Sale not found',
    httpStatusCode.notFound,
  );

  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const response = await salesCollection.findOne({_id: ObjectId(id)});
  return response;
};


module.exports = {
  create,
  findOneById,
  findAll,
  update,
  deleteOne,
};
