const { ObjectID } = require('mongodb');
const connection = require('./connection');
const ProductModels = require('./Product');
const Validate = require('../services/Validation');

const create = async (SoldList) => {
  const { productId, quantity } = SoldList[0];
  const currentProduct = await ProductModels.findById(productId);
  const currentQty = currentProduct.quantity;
  const stockUpdate = currentQty - quantity;
  const minQuantity = 0;

  if (stockUpdate < minQuantity) return false;

  await ProductModels.update(productId, currentProduct.name, stockUpdate);

  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: SoldList }))
    .then((response) => response.ops[0]);
};

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const findById = async (id) => { 
  if (!ObjectID.isValid(id)) return Validate.errNotFound;
  const sale = connection()
    .then((db) => db.collection('sales').findOne(new ObjectID(id)))
    .then(res => res);
  return sale;
};

const editSale = async (id, productId, quantity) => {
  return connection()
    .then((db) => db.collection('sales')
      .updateOne(
        {_id: ObjectID(id)}, 
        {$set: {productId, quantity}}
      ).then(() => ({_id: id, productId, quantity})));
};

const removeSale = async (id) => {
  if (!ObjectID.isValid(id)) return Validate.errDelete;

  const saleToBeRemoved = await findById(id);

  if (!saleToBeRemoved) return Validate.errDelete;

  const { productId, quantity } = saleToBeRemoved.itensSold[0];
  const { name, quantity: currentQuantity } = await ProductModels.findById(productId);
  const newQuantity = currentQuantity + quantity;

  await ProductModels.update(productId, name, newQuantity);

  return await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: new ObjectID(id) }))
    .then(() => saleToBeRemoved);
};

module.exports = {
  create,
  getAll,
  findById,
  editSale,
  removeSale,
};