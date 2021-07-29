const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  
  const newProduct = await db.collection('products')
    .insertOne({
      name,
      quantity,
    });
  
  return newProduct.ops[0];
};

const readAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

module.exports = {
  create,
  readAll
};
