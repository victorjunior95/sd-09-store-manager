const { ObjectId, ObjectID } = require('mongodb');
const connection = require('./connection');

const findByName = (name) => {
  return connection().then((db) => db.collection('products').findOne({name}));
};

const addProduct = async ({name, quantity}) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  
  return {
    _id: result.insertedId,
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const result = await connection()
    .then((db) => {
      const userId = new ObjectId(id);
      const newData = { name, quantity};
      return db.collection('products').findOneAndUpdate(
        { '_id': userId }, { $set: newData }, { returnOriginal: false });
    }).then((result) => result.value);

  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const result = await connection()
    .then((db) => db.collection('products').remove({ '_id': new ObjectId(id) }));

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  addProduct,
  findByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
