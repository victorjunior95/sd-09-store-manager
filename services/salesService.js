const SalesModel = require('../models/salesModel');
const validationNumb = require('./validations/validateQuantity');
const validadeProductExists = require('./validations/validadeProductExists');

const validateSales = async (productsSales) => {
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

  if (isInvalidNum || isInvalidId || isInvalidNumb) return {
    err: {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    }
  };
  return true;
};

const findAll = async () => {
  const sales = await SalesModel.findAll();
  return sales;
};

const findById = async (id) => {
  const sales = await SalesModel.findById(id);

  if (sales === null) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return sales;
};

const create = async (productsSales) => {
  const validations = await validateSales(productsSales);

  if (validations !== true) return validations;

  return SalesModel.create(productsSales);
};

const update = async ({ id, productsSales }) => {
  const validations = await validateSales(productsSales);

  if (validations !== true) return validations;

  return SalesModel.update({ id, productsSales });
};

const exclude = async (id) => {
  const deleted = await SalesModel.exclude(id);
  
  if (deleted === null) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };
  return deleted;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  exclude,
};