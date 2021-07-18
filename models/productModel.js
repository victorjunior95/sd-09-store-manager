const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function save({ name, quantity }) {
  const products = await connection('products');
  const product = {
    name,
    quantity,
  };
  const { ops } = await products.insertOne(product);
  return ops[0];
}

async function findByName(name) {
  const products = await connection('products');
  const product = await products.findOne({ name });
  return product;
}

async function findAll() {
  const productCollection = await connection('products');
  return productCollection.find().toArray();
}

async function findById(id) {
  const productCollection = await connection('products');
  if (!ObjectId.isValid(id)) {
    return;
  }
  const product = await productCollection.findOne({ _id: new ObjectId(id) });
  return product;
}

async function update({ id, name, quantity }) {
  const productCollection = await connection('products');
  if (!ObjectId.isValid(id)) {
    return;
  }
  const result = await productCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, quantity } },
  );
  return { id, name, quantity };
}

module.exports = {
  save,
  findByName,
  findAll,
  findById,
  update,
};
