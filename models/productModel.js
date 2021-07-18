const connection = require('./connection');

async function save({ name, quantity }) {
  const products = await connection().then((conn) => conn.collection('products'));
  const product = {
    name,
    quantity,
  };
  const { ops } = await products.insertOne(product);
  return ops[0];
}

async function findByName(name) {
  const products = await connection().then((conn) => conn.collection('products'));
  const product = await products.findOne({name});
  return product;
}

module.exports = {
  save,
  findByName,
};
