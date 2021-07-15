const mongoConnection = require('../util/mongoConnection');
const ObjectId = require('mongodb').ObjectId;

const registerNewProduct = async (product) => {
  const newProduct = await mongoConnection().then((db) => {
    return db.collection('products').insertOne(product)
      .then(newProduct => newProduct.ops[0]);
  });

  return {message: newProduct, status: 201};
};

const getProducts = async () => {
  return await mongoConnection().then(db => 
    db.collection('products').find().toArray()
  );
};

const getProductById = async (id) => {
  if(!ObjectId.isValid(id)){return null;}
  const product = await mongoConnection().then(db => 
    db.collection('products').find({_id:ObjectId(id)}).toArray()
  );
  return product[0];
};

module.exports = {
  registerNewProduct,
  getProducts,
  getProductById
};
