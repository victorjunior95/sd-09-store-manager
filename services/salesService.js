const salesModel = require('../models/salesModel');

const postNewSales = async (soldItens) => {
  const data = await salesModel.postNewSales(soldItens);
  return data.ops[0];
};

module.exports = {
  postNewSales,
};