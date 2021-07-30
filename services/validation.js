const Joi = require('joi');

const StoreModel = require('../models/storeModel');
const SalesModel = require('../models/salesModel');

const emptyQuantity = 0;

const nameAndQuantityAreValid = (name, quantity) => {
  const requiredString = Joi.string().not().empty().required();
  const requiredNumber = Joi.number().not().empty().required();
  const minLengthString = 5;
  const minQuantity = 1;
  
  const erro =  Joi.object({
    name: requiredString.min(minLengthString),
    quantity: requiredNumber.integer().min(minQuantity),
  }).validate({ name, quantity });
  return erro;
};

const quantityIsValid = (quantity) => {
  const requiredNumber = Joi.number().not().empty().required();
  const minQuantity = 1;

  const erro =  Joi.object({
    quantity: requiredNumber.integer().min(minQuantity),
  }).validate({ quantity });
  return erro;
};

const subtractQuantity = async ({ productId, quantity }) => {
  const product = await StoreModel.getByIdOrName(productId);
  const newQuantity = product.quantity - quantity;
  if (newQuantity <= emptyQuantity) return true;
  await StoreModel.updateById(productId, null, newQuantity);
};

const addQuantity = async ({ productId, quantity }) => {
  const product = await StoreModel.getByIdOrName(productId);
  const newQuantity = product.quantity + quantity;
  await StoreModel.updateById(productId, null, newQuantity);
};

const updatingQuantity = async (idSale, idOnSale, quantity) => {
  const [{ itensSold }] = await SalesModel.getById(idSale);
  const oldQuantity = itensSold
    .find(({ productId }) => productId === idOnSale).quantity;
  const product = await StoreModel.getByIdOrName(idOnSale);
  const updateQuantity = product.quantity + oldQuantity;
  const newQuantity = updateQuantity - quantity;
  if (newQuantity <= emptyQuantity) return true;
  await StoreModel.updateById(idOnSale, 'Antonio', newQuantity);
};

module.exports = {
  nameAndQuantityAreValid,
  quantityIsValid,
  subtractQuantity,
  addQuantity,
  updatingQuantity,
};
