const { ObjectId } = require('mongodb');
const connect = require('./connection');

const findByName = async (name) => {
  const connection = await connect();
  const product = await connection.collection('products').findOne({ name }) ;

  return Boolean(product);
};

const register = async (name, quantity) => {
  const connection = await connect();
  const newProduct = await connection.collection('products')
    .insertOne({ name, quantity });

  return newProduct.ops[0];
};

const list = async (_id) => {
  const connection = await connect();
  if (_id) {
    try {
      const find = await connection.collection('products').findOne({
        _id: ObjectId(_id)
      });

      return find;
    } catch {
      return;
    }
  }

  const productsList = await connection.collection('products').find().toArray();
  return productsList;
};

const update = async (_id, name, quantity) => {
  const connection = await connect();
  const updateProduct = await connection.collection('products').updateOne(
    {
      _id: ObjectId(_id)
    },
    {
      $set: { name, quantity }
    }
  );

  return updateProduct;
};

const remove = async (_id) => {
  try {
    const connection = await connect();

    const checkedProduct = await connection.collection('products')
      .findOne({ _id: ObjectId(_id) });
    if (!checkedProduct) return;

    const deleteOne = await connection.collection('products')
      .deleteOne({ _id: ObjectId(_id) });
    if (deleteOne.deletedCount !== 1) return;

    return checkedProduct;
  } catch {
    return;
  }
};

module.exports = {
  findByName,
  register,
  list,
  update,
  remove
};
