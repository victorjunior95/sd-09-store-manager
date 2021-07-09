const salesModel = require('../models/salesModel');
const validateSaleQuantity = require('../schemas/validateSaleQuantity');

const addSales = async (body) => {
  const validate = validateSaleQuantity(body);
  if (validate.err) return validate;

  const result = await salesModel.addSales(body);

  return result;
};

module.exports = {
  addSales,
};
