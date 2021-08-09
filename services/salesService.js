const { ObjectId } = require('mongodb');

const StoreModel = require('../models/storeModel');
const SalesModel = require('../models/salesModel');
const Validation = require('./validation');

const message_1 = 'Wrong product ID or invalid quantity';
const message_2 = 'Sale not found';
const message_3 = 'Wrong sale ID format';
const message_4 = 'Such amount is not permitted to sell';

const emptyArray = 0;

const create = async (productsSold) => {
  const error = productsSold.find(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) return true;
    if (Validation.quantityIsValid(quantity).error) return true;
  });
  if (error) return { message: message_1 };
  const productsById = await StoreModel.getByIds(productsSold);
  const arrayIds = productsById.map(({_id}) => _id.toString());
  const existingProduct = productsSold
    .find(({ productId }) => !arrayIds.includes(productId));
  if (existingProduct) return { message: message_1 };
  const sold = await SalesModel.create(productsSold);
  const promises = sold.itensSold
    .map(async item => await Validation.subtractQuantity(item));
  const quantityError = await Promise.all(promises);
  if (quantityError.reduce((acc, curr) => acc || curr)) return { message: message_4 };
  return sold;
};

const getAll = async () => {
  const products = await SalesModel.getAll();
  return products;
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) return { message: message_2 };
  const sale = await SalesModel.getById(id);
  if (!sale || sale.length === emptyArray) return { message: message_2 };
  return sale;
};

const updateById = async (id, productId, quantity) => {
  if(!ObjectId.isValid(id)) return { message: message_1 };
  if(!ObjectId.isValid(productId)) return { message: message_1 };
  const { error } = Validation.quantityIsValid(quantity);
  if (error) return { message: message_1 };
  const quantityError = await Validation.updatingQuantity(id, productId, quantity);
  if (quantityError) return { message: message_4 };
  const { modifiedCount } = await SalesModel.updateById(id, productId, quantity);
  return { modifiedCount };
};

const deleteById = async (id) => {
  if(!ObjectId.isValid(id)) return { message: message_3 };
  const sale = await SalesModel.deleteById(id);
  if (!sale || sale.length === emptyArray) return { message: message_3 };
  await Validation.addingQuantity(sale[0].itensSold[0]);
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
