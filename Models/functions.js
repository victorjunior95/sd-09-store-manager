const connection = require('./connection');

async function create(name, quantity) {
  const createProduct = await connection()
    .then(db => db.collection('products').insertOne({name, quantity}));

  return createProduct;
}

const findProductName = async (name) => {
  const findProduct = await connection()
    .then(db => db.collection('products').find({ name }).toArray());

  return findProduct;
};

module.exports = {
  create,
  findProductName,
};