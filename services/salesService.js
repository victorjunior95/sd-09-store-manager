const {
  createSalesModel,
  listSalesModel,
  saleByIdModel,
  saleUpdateModel,
  saleDeleteModel,
  verifyStockModel,
} = require('../models/sales');
const joi = require('joi');
const { ObjectId } = require('mongodb');

const minChar = 5;

// Validação de arrays com Joi verificado no link https://stackoverflow.com/questions/42656549/joi-validation-of-array
// Alterar as mensagens retornadas do Joi https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages

const createValidation = joi.array().items(joi.object({
  productId: joi.string().min(minChar).required(),
  quantity: joi.number().min(1).required()
    .messages({
      'number.base': 'Wrong product ID or invalid quantity',
      'number.min': 'Wrong product ID or invalid quantity'
    }),
}));

const createSales = async (salesData) => {
  const { error } = createValidation.validate(salesData);
  if (error) {
    return {
      code: 'invalid_data',
      message: error.message,
    };
  }
  // ao passar sem erro, após a criação da sale deverá aguardar a redução da quantidade em products.
  // const reduceStock = await functionToReduce();
  const create = await createSalesModel(salesData);
  
  return create;
};

// Referência do promise.all https://stackoverflow.com/questions/39452083/using-promise-function-inside-javascript-array-map

const verifyStock = async (salesData) => {
  return await Promise.all(salesData.map(async product => {
    const soldItems = product.quantity;
    const stock = await (verifyStockModel(product));

    if (stock < soldItems) return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      } };
    return;
  }));

  // return testes;
  // const { productId } = salesData;
  // const availableStock = await verifyStockModel();
  // return availableStock;
};

const salesList = async () => {
  const list = await listSalesModel();
  return list;
};

const saleListById = async (id) => {
  console.log(id);
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };
  const saleById = await saleByIdModel(id);
  if (!saleById) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };
  return saleById;
};

const saleUpdate = async (saleData) => {
  const { id, itensSold } = saleData;

  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };
  const { error } = createValidation.validate(itensSold);

  if (error) {
    return {
      err: {
        code: 'invalid_data',
        message: error.message,
      }
    };
  };
  
  const updated = await saleUpdateModel(saleData);
  return updated;
};

const saleDelete = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    }
  };
  const deleted = await saleDeleteModel(id);
  return deleted;
};

module.exports = {
  createSales,
  salesList,
  saleListById,
  saleUpdate,
  saleDelete,
  verifyStock,
};
