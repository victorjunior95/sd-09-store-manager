const connection = require('./connection');

const registerProductModel = async (name, quantity) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const existsProduct = await productsCollection.find({ name });
  if(existsProduct) throw {
    message: 'Product already exists',
    status: 422,
    code: 'invalid_data'
  };
  
  const response = await productsCollection.insertOne({name, quantity});
  return response.ops[0];
};

module.exports = { registerProductModel };
