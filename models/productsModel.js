const connection = require('./connection');
const { ObjectId } = require('mongodb');

// create
const add = async (name, quantity) => {
  try {
    const productObj = { name, quantity };
    const response = await (await connection())
      .collection('products').insertOne(productObj);
    return response.ops[0];
  } catch (error) {
    return error;
  }
};

// select
const getAll = async () => {
  try {
    const response = (await (await connection()).collection('products').find().toArray());
    return response;
  } catch (error) {
    return error;
  }
};

// getById
const getById = async (id) => {
  try {
    const product = (await (await connection()).collection('products')
      .find({ _id: id }).toArray());

    return product[0];
  } catch (error) {
    return error;
  }
};

const getByName = async (name) => {
  try {
    const product = (await connection()).collection('products')
      .find({ name }).toArray();

    return product;
  } catch (error) {
    return error;
  }
};

// update
const update = async (id, name, quantity) => {
  const response = await(await connection())
    .collection('products').updateOne({ _id: id }, { $set: { name, quantity } });
  const newProduct = { _id: id, name, quantity };

  if (response.result.nModified) {
    // colocar uma messagem
  }
  return newProduct;
};

module.exports = {
  add,
  getAll,
  getByName,
  getById,
  update,
};
