const { getAllSales, insertSales } = require('../models/salesModels');
const { verifyQuantityArray } = require('./saleFormatValidator');


const registerSales = async (body) => {
  const verifyQuantity = verifyQuantityArray(body);
  if (!verifyQuantity) return verifyQuantity;

  const result = await insertSales(body);
  return { code: 200, message: result };
};

const allSalesService = async () => {
  const sales = await getAllSales();

  return {
    code: 200,
    message: {
      sales,
    },
  };
};

const findSale = async (id) => {
  if (!ObjectId.isValid(id)) return INVALID_ID;
  const product = await findProductById(id);

  if (product === null || product === undefined) return INVALID_ID;

  return { code: 200, message: product };
};

module.exports = { 
  allSalesService,
  findSale,
  registerSales,
};
