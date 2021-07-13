const servicesProducts = require('../services/products');
const { messageError } = require('../middlewares/errors');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNPROCESSEBLEENTRY_STATUS = 422;

const productNameIsValid = (name) => {
  const minString = 5;

  if (name.length <= minString || typeof(name ) !== 'string') {
    throw messageError (UNPROCESSEBLEENTRY_STATUS, 'invalid_data',
      '"name" length must be at least 5 characters long');
  };
};

const productQuantityIsValid = (quantity) => {
  const minNumber = 0;

  if (quantity <= minNumber) {
    throw messageError (UNPROCESSEBLEENTRY_STATUS, 'invalid_data',
      '"quantity" must be larger than or equal to 1');
  }

  if (isNaN(quantity)) {
    throw messageError (UNPROCESSEBLEENTRY_STATUS, 'invalid_data',
      '"quantity" must be a number');
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity} = req.body;

    productNameIsValid(name);
    productQuantityIsValid(quantity);

    const product = await servicesProducts.create(name, quantity);

    return res.status(CREATED_STATUS).json(product);
  }

  catch(err) {
    next(err);
  }
  
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity} = req.body;

    productNameIsValid(name);
    productQuantityIsValid(quantity);

    const product = await servicesProducts.edit(id, name, quantity);

    return res.status(OK_STATUS).json(product);
  }

  catch(err) {
    next(err);
  }
  
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await servicesProducts.getById(id);

    if (!product) {
      throw messageError (UNPROCESSEBLEENTRY_STATUS, 'invalid_data',
        'Wrong id format');
    }

    return res.status(OK_STATUS).json(product);

  }

  catch(err) {
    next(err);
  }
  
};

const getAll = async (_req, res, next) => {
  try {
    const allProducts = await servicesProducts.getAll();

    return res.status(OK_STATUS).json({ products: allProducts});
  }

  catch(err) {
    next(err);
  }

};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await servicesProducts.remove(id);

    if (!product) {
      throw messageError (UNPROCESSEBLEENTRY_STATUS, 'invalid_data',
        'Wrong id format');
    }

    return res.status(OK_STATUS).json(product);
  }

  catch(err) {
    next(err);
  }

};

module.exports = {
  create,
  edit,
  getById,
  getAll,
  remove,
};

