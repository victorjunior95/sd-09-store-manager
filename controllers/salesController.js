const SalesService = require('../services/salesService');
const httpStatusCode = require('../httpStatusCodes');

const create = async (req, res) => {
  const products = req.body;

  try {
    const sale = await SalesService.create(products);
    return res.status(httpStatusCode.ok).json(sale);
  } catch (err) {
    const {code, message, statusCode} = err;
    return res.status(statusCode).json({err:{code, message}});
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const products = req.body;
  try {
    const sale = await SalesService.update(id, products);
    return res.status(httpStatusCode.ok).json(sale);
  } catch (err) {
    const {code, message, statusCode} = err;
    return res.status(statusCode).json({err:{code, message}});
  }
};

const deleteOne = async(req, res) => {
  const { id } = req.params;
  try {
    const sale = await SalesService.deleteOne(id);
    return res.status(httpStatusCode.ok).json(sale);
  } catch (err) {
    const {code, message, statusCode} = err;
    return res.status(statusCode).json({err:{code, message}});
  }
};

const listAll = async(_req, res) => {
  const products = await SalesService.findAll();

  return res.status(httpStatusCode.ok).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await SalesService.findById(id);
    return res.status(httpStatusCode.ok).json(product);
  } catch (err) {
    const {code, message, statusCode} = err;
    return res.status(statusCode).json({err:{code, message}});
  }
};

module.exports = {
  create,
  listAll,
  findById,
  update,
  deleteOne
};
