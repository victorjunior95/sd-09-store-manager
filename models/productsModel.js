const connection = require('./connection');

const getAllProducts = async () => {
  try {
    return connection()
      .then ((db) => db.collection('products').find().toArray());
  } catch (error) {
    return {
      error: error.status,
      message: error.message,
    };
  }
};

const addNewProduct = async ({ name, quantity }) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => result.ops[0]);
};

module.exports = {
  getAllProducts,
  addNewProduct,
};
