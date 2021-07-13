const SalesServices = require('../services/SalesServices');
const statusCode = require('../utils/statusCode');

const create = async (req, res, next) => {
  const itensSold = req.body;

  const newSale = await SalesServices.create(itensSold);

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

const update = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const updatedSale = await SalesServices.update(id, itensSold);
  return res.status(statusCode.ok).json(updatedSale);
};

module.exports = {
  create,
  getAll,
  getById,
  // remove,
  update,
};
