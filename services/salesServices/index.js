const salesModels = require('../../models/Sales');
const { validateQuantity } = require('../salesServices/validateQuantity');
const { validateFoundId } = require('../salesServices/validateFoundId');

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

module.exports = {
  insertOneSale,
  getAllSales,
  getOneSaleById
};
