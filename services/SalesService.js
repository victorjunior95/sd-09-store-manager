const SalesModel = require('../models/SalesModel');

const createSales = async (body) => {
  const { insertedId } = await SalesModel.createSales(body);
  
  return {
    _id: insertedId,
    itensSold: body,
  };
};

module.exports = {
  createSales
};
