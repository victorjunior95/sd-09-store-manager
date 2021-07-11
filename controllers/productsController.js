const ProductsService = require('../services/productsService');
const httpStatusCode = require('../httpStatusCodes');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const product = await ProductsService.create(name, quantity);
    return res.status(httpStatusCode.created).json(product);
  } catch (err) {
    const {code, message, statusCode} = err;
    return res.status(statusCode).json({err:{code, message}});
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    product = await ProductsService.update(id, name, quantity);
    return res.status(httpStatusCode.ok).json(product);
  } catch (err) {
    const {code, message, statusCode} = err;
    return res.status(statusCode).json({err:{code, message}});
  }
};

const listAll = async(_req, res) => {
  const products = await ProductsService.findAll();

  return res.status(httpStatusCode.ok).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductsService.findById(id);
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
  update
};
