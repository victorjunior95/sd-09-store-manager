const mongoConnection = require('../util/mongoConnection');

const registerNewProduct = async (product) => {
  const newProduct = await mongoConnection().then((db) => {
    return db.collection('products').insertOne(product)
      .then(newProduct => newProduct.ops[0]);
  });

  return {message: newProduct, status: 201};
};

module.exports = {
  registerNewProduct
};
