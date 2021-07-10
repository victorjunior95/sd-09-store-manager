const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async ({ name, quantity }) => {
  const connect = await connection();
  const createProduct = await connect.collection('products')
    .insertOne({ name, quantity });

  return {
    _id: createProduct.insertedId,
    name,
    quantity,
  };
};

const getByName = async ({ name }) => {
  const connect = await connection();
  const findName = await connect.collection('products').findOne({ name });

  return findName;
};

const getAll = async () => {
  const connect = await connection();
  const findAll = await connect.collection('products').find().toArray();

  return {
    products: [ ...findAll ],
  };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const findProduct = await connect.collection('products').findOne({ _id: ObjectId(id) });

  return findProduct;
};

const editProduct = async (id, { name, quantity }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const editedProduct = await connect.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }});

  if (editedProduct.modifiedCount < 1) {
    return false;
  }

  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const deletedProduct = await connect.collection('products')
    .findOneAndDelete({ _id: ObjectId(id) });
  
  return deletedProduct.value;
};

const decrementProductFromStock = async (itensSold) => {
  const connect = await connection();

  await itensSold.forEach((item) => {
    connect.collection('products')
      .updateOne({ _id: ObjectId(item.productId)}, {$inc: { quantity: -item.quantity}});
  });
};

const incrementProductFromStock = async (itensSold) => {
  const connect = await connection();

  await itensSold.forEach((item) => {
    connect.collection('products')
      .updateOne({ _id: ObjectId(item.productId)}, {$inc: { quantity: item.quantity}});
  });
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  editProduct,
  deleteProduct,
  decrementProductFromStock,
  incrementProductFromStock,
};
