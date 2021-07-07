const connection = require('./connection');

const registerProduct = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('produtos'));

  const response = await productsCollection.insertOne({name, quantity});
  console.log(response);
};

module.exports = { registerProduct };
