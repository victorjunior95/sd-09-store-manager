const ProductsService = require('../services/productsService');
const httpStatusCode = require('../httpStatusCodes');

const create = async (req, res) => {
  const {name, quantity} = req.body;

  try {
    const product = await ProductsService.create({name, quantity});
    return res.status(httpStatusCode.created).json(product);
  } catch (err) {
    const {code, message, statusCode} = err;
    return res.status(statusCode).json({err:{code, message}});
  }
};

module.exports = {
  create,
};
