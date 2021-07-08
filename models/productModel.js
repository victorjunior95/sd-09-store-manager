const connection = require('./connection');

const { ObjectId } = require('mongodb');

const create = async ({name, quantity}) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const { insertedId: id} = await productsCollection
    .insertOne({name, quantity});

  return {
    id,
  };
};

const updateById = async (id, name, quantity) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  await productsCollection
    .updateOne({_id: ObjectId(id)},{$set :{ name, quantity}});
  return {_id: id, name, quantity};
};


const deleteById = async (id) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const result = await productsCollection
    .deleteOne({_id: ObjectId(id)});
  console.log(result);
  return result;
};

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const products = await productsCollection.find().toArray();

  return products;
};


const getById = async (id) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  const product = await productsCollection.findOne(new ObjectId(id));

  return product;
};

const getByName = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const exists = await productsCollection
    .find({'name': name}).toArray();
  return exists;
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  updateById,
  deleteById
};
