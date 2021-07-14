const { ObjectID } = require('mongodb');
const connection = require('../connect');

const updateProduct = async (id, product) => {
  const db = await connection();
  const result = await db.collection('products').updateOne(
    { _id: ObjectID(id) },
    { 
      $set: {
        name: product.name,
        quantity: product.quantity,
      },
    },
  );
  return { _id: id, ...product };
};

module.exports = updateProduct;