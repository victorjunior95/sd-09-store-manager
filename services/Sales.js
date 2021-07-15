// Req 5
const Sales = require('../models/Sales');

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
// Req 7
const updateById = async (id, itensSold) => {
  const updateSale = await Sales.register(id, itensSold);
  return updateSale;
};

module.exports = {
  register,
  findAll,
  findById,
  updateById
};
