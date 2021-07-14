const { getAllSales } = require('../models/salesModels');

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
};
