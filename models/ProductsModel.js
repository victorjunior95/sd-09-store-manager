const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection('products').innerOne({ name, quantity }),
  );
  return newProduct.ops[0];
};

const findByName = (name) => {
  const isThereProduct = connection().then((db) =>
    db.collection('products').findOne({ name }),
  );

  if(isThereProduct) return true;

  return false;
};

module.exports = {
  createProduct,
  findByName
};
