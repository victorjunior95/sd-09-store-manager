const { createSalesModel, listSalesModel, saleByIdModel } = require('../models/sales');
const joi = require('joi');
const { ObjectId } = require('mongodb');

// Criar as verificações para o requisito 5.
// Verificar push no github
// menor ou igual zero
// string
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
  const create = await createSalesModel(salesData);
  return create;
};

const salesList = async () => {
  const list = await listSalesModel();
  return list;
};

const saleListById = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };
  const saleById = await saleByIdModel(id);
  return saleById;
};

module.exports = {
  createSales,
  salesList,
  saleListById,
};
