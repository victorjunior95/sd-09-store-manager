const ServiceProducts = require('../services/ServiceProducts');

const CREATED = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const createProduct = await ServiceProducts.create({ name, quantity });

  if (createProduct.err) {
    return next(createProduct.err);
  }

  return res.status(CREATED).json(createProduct);
};

module.exports = {
  create,
};
