const productModel = require('../models/productModel');

const STATUS_ERROR_CLIENT = 422;

// Req01
const nameExist = async(name) =>{
  const nameCheck = await productModel.findByName(name);
  // console.log(nameCheck);
  return nameCheck;
};

// Req01
const productNameCheck = async(req, res, next) => {
  const {name} = req.body;
  const nameMin = 5;
  const testnameCheck = await nameExist(name);
  // console.log(testnameCheck);
  if (name.length < nameMin) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  if (testnameCheck) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        'message': 'Product already exists'
      }
    });
  }
  return next();
};

// Req01 - 03
const productQuatityCheck = (req, res, next) =>{
  const {quantity} = req.body;
  const quantityMin = 1;
  if(typeof quantity !== 'number') {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }
  if (quantity < quantityMin) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  return next();
};

// Req03
const productUpdateCheck = async(req, res, next) => {
  const { name } = req.body;
  const nameMin = 5;
  if (name.length < nameMin) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  return next();
};

// Req04
const idRemoveCheck = async(req, res, next) => {
  const { id } = req.params;
  const product = await productModel.getById(id);
  if(!product) {
    res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  return next();
};

module.exports = {productNameCheck, productQuatityCheck, productUpdateCheck,
  idRemoveCheck };