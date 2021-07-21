const {
  createSalesModel,
  listSalesModel,
  saleByIdModel,
  saleUpdateModel,
  saleDeleteModel,
} = require('../models/sales');
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
};
