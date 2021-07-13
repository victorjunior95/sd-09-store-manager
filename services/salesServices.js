const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const Joi = require('@hapi/joi');

const MIN_QUANTITY = 1;

// Mensagens customizadas do Joi conforme visto em:
// https://stackoverflow.com/a/58234246
const saleItemsValidationSchema = Joi.object({
  quantity: Joi.number().min(MIN_QUANTITY).required()
    .messages({
      'number.base': 'Wrong product ID or invalid quantity',
      'number.min': 'Wrong product ID or invalid quantity'
    })
});

const restoreStockQuantities = async (saleId) => {
  const sale = await salesModel.getSaleById(saleId);
  if (!sale) return;
  const { itensSold: productsToRestoreStock } = sale;
  productsToRestoreStock.forEach(async (item) => {
    const stockItem = await productsModel.getProductById(item.productId);
    const restoredQuantity = stockItem.quantity + item.quantity;
    await productsModel.updateProduct(item.productId, stockItem.name, restoredQuantity);
  });
};

const updateStockQuantities = async (soldItems) => {
  // Método pra garantir a resolução das promises em iteração de arrays conforme visto em:
  // https://stackoverflow.com/a/40140562
  const productsToUpdate = await Promise.all(soldItems.map(async (item) => {
    const { name, quantity } = await productsModel.getProductById(item.productId);
    if (quantity < item.quantity) {
      return { err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      } };
    }
    return { id: item.productId, name, quantity: quantity - item.quantity };
  }));
  const stockError = productsToUpdate.find((item) => Object.keys(item).includes('err'));
  if (stockError) return stockError;
  productsToUpdate.forEach(async ({ id, name, quantity }) => {
    await productsModel.updateProduct(id, name, quantity);
  });
  return false;
};

const createSale = async (soldItems) => {
  const validationResult = soldItems
    .map(({ quantity }) => saleItemsValidationSchema.validate({ quantity }))
    .find((validations) => Object.keys(validations).includes('error'));
  if (validationResult) {
    return { err: {
      code: 'invalid_data',
      message: validationResult.error.details[0].message
    } };
  }
  const updateProductsCheck = await updateStockQuantities(soldItems);
  if (updateProductsCheck) return updateProductsCheck;
  const newSale = await salesModel.createSale(soldItems);
  if (!newSale) return { err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  } };
  return newSale;
};

const updateSale = async (id, soldItems) => {
  const validationResult = soldItems
    .map(({ quantity }) => saleItemsValidationSchema.validate({ quantity }))
    .find((validations) => Object.keys(validations).includes('error'));
  if (validationResult) {
    return { err: {
      code: 'invalid_data',
      message: validationResult.error.details[0].message
    } };
  }
  await restoreStockQuantities(id);
  const updateProductsCheck = await updateStockQuantities(soldItems);
  if (updateProductsCheck) return updateProductsCheck;
  const updatedSale = await salesModel.updateSale(id, soldItems);
  if (!updatedSale) return { err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  } };
  return updatedSale;
};

const deleteSale = async (id) => {
  await restoreStockQuantities(id);
  return await salesModel.deleteSale(id);
};

module.exports = {
  createSale,
  updateSale,
  deleteSale,
};
