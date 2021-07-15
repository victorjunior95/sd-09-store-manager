const connection = require('./connection');

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const findByName = async (name) => {
  let isThereProduct = false;

  await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((data) => (isThereProduct = data));

  if (isThereProduct) return true;

  return false;
};

const createProduct = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return newProduct.ops[0];
};

module.exports = {
  createProduct,
  findByName,
  getAll,
};
