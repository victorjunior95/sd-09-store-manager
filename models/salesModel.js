const connection = require('./connections');
const { ObjectId } = require('mongodb');

const { getByIdProduct, updateProduct } = require('./productsModel');

const createSales = async (newSales) => {
  const zero = 0;
  const { productId, quantity } = newSales[0];

  const product = await getByIdProduct(productId);
  if (!product) return null;
  const newQuantity = product.quantity - quantity;
  if (newQuantity < zero) return null;
  await updateProduct(productId, product.name, newQuantity);

  const result = await connection()
    .then((db) => db
      .collection('sales')
      .insertOne({ itensSold: newSales }));
  return result.ops[0];
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db
      .collection('sales')
      .find()
      .toArray())
    .then((result) => ({ sales: result }));
};

const getByIdSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db
      .collection('sales')
      .findOne(ObjectId(id)));
};

const updateSale = async (id, updates) => {
  if (!ObjectId.isValid(id)) return null;
  await connection()
    .then((db) => db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold: updates } }
      ));
  return { _id: id, itensSold: updates };
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sales = await getByIdSale(id);
  if (!sales) return null;
  const { productId, quantity: quantitySales } = sales.itensSold[0];

  const { name, quantity: quantityProduct } = await getByIdProduct(productId);
  const newQuantity = quantityProduct + quantitySales;
  await updateProduct(productId, name, newQuantity);

  const result = await connection()
    .then((db) => db
      .collection('sales')
      .findOneAndDelete({ _id: ObjectId(id) }));

  return result.value;
};

module.exports = {
  createSales,
  deleteSale,
  getAllSales,
  getByIdSale,
  updateSale,
};
