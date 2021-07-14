// Req 5
const Sales = require('../models/Sales');
const { status, message, code } = require('../schema/status');

const register = async (itensSold) => {
  const registerSale = await Sales.register(itensSold);
  return registerSale;
};

module.exports = {
  register,
};
