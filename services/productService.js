const productModel = require('../models/productModel');

const alreadyExists =   (name) => {
  const response =    productModel.getByName(name);
  // return response;
  return false;
};

const isValidName = (name) => {
  const minLength = 5;
  const exists =  alreadyExists(name);
  if (name.length < minLength) {
    return { 'err':
    {'code': 'invalid_data',
      'message': '"name" length must be at least 5 chracters long'}};
  }
  console.log(exists, 'existe saporra');
  if ( typeof exists === 'object' ) {
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
  const nameValidity = isValidName(name);
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

module.exports = {
  create,
};
