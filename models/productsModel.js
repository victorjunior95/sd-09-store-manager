const connection = require('./connection');

const addProduct = async (productData) => {
  const { name, quantity } = productData;

  const productsCollection = await connection().then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection.insertOne({
    name,
    quantity,
  });

  return { _id, name, quantity };
};

module.exports = {
  addProduct,
};
