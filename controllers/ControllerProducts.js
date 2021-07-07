const ServiceProducts = require('../services/ServiceProducts');

const UNPROCESSABLE_ENTITY = 422;
const CREATED = 201;

const create = async (req, res, _next) => {
  const { name, quantity } = req.body;

  const createProduct = await ServiceProducts.create({ name, quantity });

  if (createProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(createProduct);
  }

  return res.status(CREATED).json(createProduct);
};

module.exports = {
  create,
};
