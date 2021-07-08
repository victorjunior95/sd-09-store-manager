const ServiceSales = require('../services/ServiceSales');

const SUCCESS = 200;

const create = async (req, res, _next) => {
  const itensSold = req.body;

  const createSale = await ServiceSales.create(itensSold);

  res.status(SUCCESS).json(createSale);
};

const getAllOrById = async (req, res, next) => {
  const { id } = req.params;

  const findAllOrById = await ServiceSales.getAllOrById(id);

  if (findAllOrById.err) {
    return next(findAllOrById.err);
  }

  res.status(SUCCESS).json(findAllOrById);
};

module.exports = {
  create,
  getAllOrById,
};
