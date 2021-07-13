const SalesServices = require('../services/SalesServices');
const statusCode = require('../utils/statusCode');

const create = async (req, res, next) => {
  const sale = req.body;

  const newSale = await SalesServices.create(sale);

  if (newSale.err) return next(newSale);

  return res.status(statusCode.ok).json(newSale);
};

const getAll = async (_req, res) => {
  const allProducts = await SalesServices.getAll();
  return res.status(statusCode.ok).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await SalesServices.getById(id);
  return res.status(statusCode.ok).json(product);
};

// const remove = async (req, res) => {
//   const { id } = req.params;
//   const product = await SalesServices.remove(id);
//   return res.status(statusCode.ok).json(product);
// };

// const update = async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const product = await SalesServices.update(id, name, quantity);
//   return res.status(statusCode.ok).json(product);
// };

module.exports = {
  create,
  getAll,
  getById,
  // remove,
  // update,
};
