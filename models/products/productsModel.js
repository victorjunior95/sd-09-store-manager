const connection = require('../connection');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const searchProductName = async (searchName) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name: searchName }));
};

const findById = async (id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const createProducts = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  searchProductName,
  createProducts,
  findById,
};
