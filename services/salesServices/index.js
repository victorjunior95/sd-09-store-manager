const salesModels = require('../../models/Sales');
const {
  validateQuantity,
  validateUpdatedSaleQuantity
} = require('../salesServices/validateQuantity');
const { validateFoundId } = require('../salesServices/validateFoundId');
const { validateFormatId } = require('../salesServices/validateFormatId');

const insertOneSale = async (productsSold) => {
  const validateQuantityErr = validateQuantity(productsSold);
  if (validateQuantityErr) return validateQuantityErr;
  const insertedOneSale = await salesModels.insertOneSale(productsSold);
  return insertedOneSale;
};

const getAllSales = async () => {
  const allSales = await salesModels.getAllSales();
  const salesArr = {
    sales: [
      ...allSales
    ]
  };
  return salesArr;
};

const getOneSaleById = async (id) => {
  const saleById = await salesModels.getOneSaleById(id);
  const validateFoundIdErr = await validateFoundId(saleById);
  if (saleById === null) return validateFoundIdErr;
  return saleById;
};

const updateOneSale = async (id, productId, quantity) => {
  const updatedSale = await salesModels.updateOneSale(id, productId, quantity);
  const validateUpdatedSaleQuantityErr = validateUpdatedSaleQuantity(quantity);
  if (validateUpdatedSaleQuantityErr) return validateUpdatedSaleQuantityErr;
  return updatedSale;
};

const deleteOneSale = async (id) => {
  const deletedSale = await salesModels.deleteOneSale(id);
  const validateFormatIdErr = validateFormatId(deletedSale);
  if (deletedSale === null) return validateFormatIdErr;
  return deletedSale;
};

module.exports = {
  insertOneSale,
  getAllSales,
  getOneSaleById,
  updateOneSale,
  deleteOneSale
};