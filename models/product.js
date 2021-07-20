const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const nameProduct = async (name) => {
  const db = await connection();
  const findName = db.collection('products').findOne({name});
  return findName;
};

const getProducts = async () => {
  const db = await connection();
  const mostraProduto = db.collection('products').find().toArray();
  return mostraProduto;
};

const productsId = async (_id) => {
  if(!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const findById = db.collection('products').findOne(ObjectId(_id));
  return findById;
};

const editProducts = async(_id, name, quantity) => {
  if(!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const editProduct = db.collection('products').updateMany(
    {
      _id: ObjectID(_id)}, 
    { $set: {name, quantity}},
  );
  return editProduct;
};

const deleteProduct = async(_id) =>{
  const db = await connection();
  const deleteProduct = db.collection('products').deleteOne(
    {
      _id: ObjectId(_id)
    }, 
  );
  return deleteProduct;
};

module.exports = { 
  createProduct, 
  getProducts,  
  nameProduct, 
  productsId,
  editProducts,
  deleteProduct
};
