const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productsCollection = 'products';

const checkProductByName = async ({ name }) => {
  const data = await connection().then((db) =>
    db.collection(productsCollection).findOne({ name }),
  );

  return data;
};

const getAllProducts = async () => {
  const data = await connection().then((db) => 
    db.collection(productsCollection).find().toArray(),
  );

  return { 
    products: data
  };
};

const getProductById = async (id) => {
  const data = await connection().then((db) => 
    db.collection(productsCollection).findOne(new ObjectId(id))
  );

  return data;
};

const postProduct = async ({ name, quantity }) => {
  const newProduct = await connection().then((db) =>
    db.collection(productsCollection).insertOne({ name, quantity })
  );

  return newProduct.ops[0];
};

const updateProduct = async ({ name, quantity, id }) => {
  const newData = await connection().then((db) => 
    db.collection(productsCollection).updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    )
  );

  return newData;
};

const deleteProduct = async (id) => {
  const deletedData = await connection().then((db) =>
    db.collection(productsCollection).deleteOne({ _id: ObjectId(id)})
  );
  if (deletedData) return deletedData;
};


module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  checkProductByName,
  updateProduct,
  deleteProduct,
};