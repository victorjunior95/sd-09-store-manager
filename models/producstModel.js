const connection = require('./connection');
const { ObjectId } = require('mongodb');
const ApiError = require('../errors/apiError');
const httpStatusCode = require('../httpStatusCodes');

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.insertOne({ name, quantity });
  const inserted = response.ops[0];
  return inserted;
};

const findAll = async () => connection()
  .then((db) => db.collection('products'))
  .then((collection) => collection.find().toArray())
  .then((products) => ({ products }));

const findOneByName = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.findOne({name});

  return response;
};

const findOneById = async (id) => {

  if(!ObjectId.isValid(id)) throw new ApiError('invalid_data',
    'Wrong id format', httpStatusCode.unprocessableEntity);

  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.findOne({_id: ObjectId(id)});
  console.log(response);
  return response;
};


module.exports = {
  create,
  findOneByName,
  findOneById,
  findAll,
};
