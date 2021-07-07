const ServiceProducts = require('../services/ServiceProducts');

const CREATED = 201;
const SUCCESS = 200;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const createProduct = await ServiceProducts.create({ name, quantity });

  if (createProduct.err) {
    return next(createProduct.err);
  }

  return res.status(CREATED).json(createProduct);
};

const getAllOrById = async (req, res, next) => {
  const { id } = req.params;

  const findAllOrById = await ServiceProducts.getAllOrById(id);

  if (findAllOrById.err) {
    return next(findAllOrById.err);
  }

  res.status(SUCCESS).json(findAllOrById);
};

module.exports = {
  create,
  getAllOrById,
};
