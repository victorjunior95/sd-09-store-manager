const service = require('../services/productService');

const CREATED_STATUS = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await service.create(name, quantity);

  if (newProduct.error) {
    return next(newProduct);
  }

  res.status(CREATED_STATUS).json(newProduct);
};

module.exports = {
  create
};
