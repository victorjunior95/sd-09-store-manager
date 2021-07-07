const connection = require('./connection');

const registerProductModel = async (name, quantity) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.insertOne({name, quantity});
  return response.ops[0];
};

module.exports = { registerProductModel };
