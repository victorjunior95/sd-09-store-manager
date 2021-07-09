const SalesModel = require('../models/salesModel');
const validationNumb = require('./validations/validateQuantity');
const validadeProductExists = require('./validations/validadeProductExists');

const findAll = async () => {
  const sales = await SalesModel.findAll();
  return sales;
};

const create = async (productsSales) => {
  const validQuantity = productsSales.map(({ quantity }) => {
    return validationNumb.isPositiveNumber(quantity);
  });

  const validNumber = productsSales.map(({ quantity }) => {
    return validationNumb.isValidNumber(quantity);
  });

  const asyncRes = await Promise.all(productsSales.map(async ({ productId }) => {
    return await validadeProductExists.isProductExistById(productId);
  }));
  
  const isInvalidNum = validQuantity.some((value) => value !== false);
  const isInvalidId = asyncRes.some((value) => value !== false);
  const isInvalidNumb = validNumber.some((value) => value !== false);

  console.log(isInvalidNum);
  console.log(isInvalidId);
  console.log(isInvalidNumb);

  if (isInvalidNum || isInvalidId || isInvalidNumb) {
    return {
      err: {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    };
  }   
  return SalesModel.create(productsSales);
};

module.exports = {
  findAll,
  create,
};