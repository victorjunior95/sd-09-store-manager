const servicesProducts = require('../services/products');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNPROCESSEBLEENTRY_STATUS = 422;

const productNameIsValid = (res, name) => {
  const minString = 5;

  if (name.length <= minString || typeof(name ) !== 'string') {
    return res.status(UNPROCESSEBLEENTRY_STATUS)
      .json({
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        }
      });
  };
};

const productQuantityIsValid = (res, quantity) => {
  const minNumber = 0;

  if (quantity <= minNumber) {
    return res.status(UNPROCESSEBLEENTRY_STATUS)
      .json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        }
      });
  }

  if (isNaN(quantity)) {
    return res.status(UNPROCESSEBLEENTRY_STATUS)
      .json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        }
      });
  }
};

const create = async (req, res, _next) => {
  const { name, quantity} = req.body;

  productNameIsValid(res, name);
  productQuantityIsValid(res, quantity);

  const product = await servicesProducts.create(name, quantity);

  if (!product) {
    return res.status(UNPROCESSEBLEENTRY_STATUS)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        }
      });
  };

  res.status(CREATED_STATUS).json(product);
  
};

const edit = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity} = req.body;

  productNameIsValid(res, name);
  productQuantityIsValid(res, quantity);

  const product = await servicesProducts.edit(id, name, quantity);

  res.status(OK_STATUS).json(product);
  
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const product = await servicesProducts.getById(id);

  if (!product) {
    return res.status(UNPROCESSEBLEENTRY_STATUS)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      });
  }

  res.status(OK_STATUS).json(product);
};

const getAll = async (_req, res, _next) => {
  const allProducts = await servicesProducts.getAll();

  res.status(OK_STATUS).json({ products: allProducts});
};

const remove = async (req, res, _next) => {
  const { id } = req.params;
  const product = await servicesProducts.remove(id);

  if (!product) {
    return res.status(UNPROCESSEBLEENTRY_STATUS)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      });
  }

  res.status(OK_STATUS).json(product);
};

module.exports = {
  create,
  edit,
  getById,
  getAll,
  remove,
};

