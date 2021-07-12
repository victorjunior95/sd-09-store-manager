const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return newProduct.ops[0];
};

const findProductName = async (name) => {
  const findProduct = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  return findProduct;
};

const getAll = async () => {
  const getAll = await connection()
    .then((db) => db.collection('products').find().toArray());

  return getAll;
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const findProduct = await connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id)}));

  return findProduct;
};

const updateProduct = async (id, name, quantity) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const product = await connection()
    .then((db) => db.collection('products')
      .findOneAndUpdate(
        {_id: ObjectId(id)},
        { $set: { name, quantity}},
        { returnOriginal: false }
      )
    ).then((result) => result.value );
  /* findOneAndUpdateretorna um documento, updateOnenão (retorna apenas o id se tiver criado um novo documento).
  https://stackoverflow.com/questions/36209434/mongodb-3-2-use-cases-for-updateone-over-findoneandupdate*/
  return product;
};

const deleteProduct = async(id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const product = await connection()
    .then((db) => db.collection('products').findOneAndDelete({_id: ObjectId(id)}))
    .then((result) => result.value );

  return product;
};

module.exports = {
  create,
  findProductName,
  getAll,
  getById,
  updateProduct,
  deleteProduct
};
