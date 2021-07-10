const { ObjectId } = require('mongodb');
const connection = require('./connection');


const registerProductModel = async (name, quantity) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.insertOne({name, quantity});
  return response.ops[0];
};

const existsProduct = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  
  const isAProduct = await productsCollection.findOne({ name });
  if(isAProduct) return true;

  return false;
};

const listaAllProductsModel = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const alProducts = await productsCollection.find().toArray();
  return alProducts;
};

const getByID = async (id) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  if (!ObjectId.isValid(id)) return null;

  const myPorduct = await productsCollection.findOne({_id: ObjectId(id)});
  return myPorduct;
};

const updateOneProductModel = async (id, name, quantity) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  if (!ObjectId.isValid(id)) return null;

  const updatedProduct = await productsCollection.updateOne(
    {_id: ObjectId(id)},
    { $set: { name, quantity }}  
  );
  return updatedProduct;
};

const deleteOneProduct = async (id) => {
  const empty = 0;
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  if (!ObjectId.isValid(id)) return null;

  const { deletedCount } =  productsCollection.deleteOne({_id: ObjectId(id) });
  if (deletedCount === empty) return false;
  return true;
};

module.exports = {
  registerProductModel,
  existsProduct,
  listaAllProductsModel,
  getByID,
  updateOneProductModel,
  deleteOneProduct,
};
