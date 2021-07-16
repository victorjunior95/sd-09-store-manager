const { ObjectId } = require('mongodb');
const connection = require('../connection');

const findProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const createSales = async (productsSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: productsSold }));

  return {
    _id: insertedId,
    itensSold: productsSold,
  };
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const updateSales = async (id, updatedSale) => {
  const { productId, quantity } = updatedSale;

  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { 'itensSold.$[element].quantity': quantity } },
        { arrayFilters: [{ 'element.productId': productId }]},
      )
    );
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  findProduct,
  createSales,
  getAll,
  getById,
  updateSales,
  deleteById,
};
