const Joi = require('joi');

const StoreModel = require('../models/storeModel');
const SalesModel = require('../models/salesModel');

const emptyQuantity = 0;

const nameAndQuantityIsValid = (name, quantity) => {
  const requiredNonEmptyString = Joi.string().not().empty().required();
  const requiredNonEmptyNumber = Joi.number().not().empty().required();
  const minLengthNameString = 5;
  const minValueQuantityNumber = 1;

  const erro =  Joi.object({
    name: requiredNonEmptyString.min(minLengthNameString),
    quantity: requiredNonEmptyNumber.integer().min(minValueQuantityNumber),
  }).validate({ name, quantity });
  return erro;
};

const quantityIsValid = (quantity) => {
  const requiredNonEmptyNumber = Joi.number().not().empty().required();
  const minValueQuantityNumber = 1;

  const erro =  Joi.object({
    quantity: requiredNonEmptyNumber.integer().min(minValueQuantityNumber),
  }).validate({ quantity });
  return erro;
};

const subtractQuantity = async ({ productId, quantity }) => {
  const product = await StoreModel.getByIdOrName(productId);
  const newQuantity = product.quantity - quantity;
  if (newQuantity <= emptyQuantity) return true;
  await StoreModel.updateById(productId, null, newQuantity);
};

const addingQuantity = async ({ productId, quantity }) => {
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
  nameAndQuantityIsValid,
  quantityIsValid,
  subtractQuantity,
  addingQuantity,
  updatingQuantity,
};
