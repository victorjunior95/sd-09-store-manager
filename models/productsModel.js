const  connection = require('./connection');

async function findProductByName(name) {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
}

async function createNewProduct(productName, quantity) {
  const db = await connection();
  const product = await db.collection('products')
    .insertOne({ name: productName, quantity });
  const result = product.ops[0];
  return result;
}

module.exports = {
  createNewProduct,
  findProductByName,
};
