const productModel = require('../models/productModel');

const { ObjectId } = require('mongodb');


const alreadyExists =   async (name) => {
  const response =    await productModel.getByName(name);
  return response;
  // return false;
};


const isValidNameLength = (name) => {
  const minLength = 5;

  if (name.length < minLength) {
    return { 'err':
    {'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long'}};
  }

  return true;
};


const isValidName = async (name) => {
  const zero = 0;
  const exists =  await alreadyExists(name);
  const nameLength = isValidNameLength(name);
  if (typeof nameLength !== 'boolean') return nameLength;
  if ( exists.length > zero ) {
    return  { 'err':
    {'code': 'invalid_data',
      'message': 'Product already exists'}};
  };
  return true;
};

const isValidQuantity = (quantity) => {
  const numberZero = 0;
  if ( typeof quantity !== 'number') {
    return  { 'err':
    {'code': 'invalid_data',
      'message': '\"quantity\" must be a number'}};
  };
  if ( quantity <= numberZero ) {
    return  { 'err':
    {'code': 'invalid_data',
      'message': '\"quantity\" must be larger than or equal to 1'}};
  }
  return true;
};

const create = async ({name, quantity}) => {
  const nameValidity = await isValidName(name);
  const quantityValidity = isValidQuantity(quantity);

  // console.log(nameValidity);

  if (typeof nameValidity === 'object') return nameValidity;
  if (typeof quantityValidity === 'object') return quantityValidity;

  const { id } = await productModel
    .create({name, quantity});

  return {
    id,
  };
};


const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    console.log('invalido');
    return null;
  }
  const product = await productModel.getById(id);
  return product;
};

const updateById = async (id, name, quantity) => {
  const nameValidity = isValidNameLength(name);
  const quantityValidity = isValidQuantity(quantity);

  if (typeof nameValidity === 'object') return nameValidity;
  if (typeof quantityValidity === 'object') return quantityValidity;

  const product = await productModel.updateById(id, name, quantity);
  return product;
};


const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const productValid = await productModel.getById(id);
  if (!productValid) return null;

  await productModel.deleteById(id);
  return productValid;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
