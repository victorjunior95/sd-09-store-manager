const { ObjectId } = require('mongodb');

const StoreModel = require('../models/storeModel');
const Validation = require('./validation');

const message = 'Wrong id format';

const create = async (name, quantity) => {
  const { error } = Validation.nameAndQuantityIsValid(name, quantity);
  if (error) return error;
  const existingProduct = await StoreModel.getByIdOrName(null, name);
  if(existingProduct) return { message: 'Product already exists'};

  return await StoreModel.create(name, quantity);
};

const getAll = async () => {
  const products = await StoreModel.getAll();
  return products;
};

const getByIdOrName = async (id) => {
  if(!ObjectId.isValid(id)) return { message };
  const product = await StoreModel.getByIdOrName(id);
  if (!product) return { message };
  return product;
};

const updateById = async (id, name, quantity) => {
  if(!ObjectId.isValid(id)) return { message };
  const { error } = Validation.nameAndQuantityIsValid(name, quantity);
  if (error) return error;
  const { modifiedCount } = await StoreModel.updateById(id, name, quantity);
  return { modifiedCount };
};

const deleteById = async (id) => {
  if(!ObjectId.isValid(id)) return { message };
  const product = await StoreModel.deleteById(id);
  if (!product) return { message };
  return product;
};

module.exports = {
  create,
  getAll,
  getByIdOrName,
  updateById,
  deleteById,
};
