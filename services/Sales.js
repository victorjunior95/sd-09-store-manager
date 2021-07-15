// Req 5
const Sales = require('../models/Sales');
const { status, message, code } = require('../schema/status');
// responsável por fazer a conexão entre a query no mongo
const register = async (itensSold) => {
  const registerSale = await Sales.register(itensSold);
  return registerSale;
};
// Req 6
const findAll = async () => {
  const soldProducts = await Sales.findAll();
  return ({ sales: soldProducts });
};
// Req 6
const findById = async (id) => {
  const soldProductsById = await Sales.findById(id);
  return soldProductsById;
};

module.exports = {
  register,
  findAll,
  findById,
};
