const productService = require('../services/productService');

const status422 = 422;
const status201 = 201;
const status200 = 200;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productService.create({name, quantity});
  if ( response['err']) {
    return res
      .status(status422)
      .json(response);
  }

  return res
    .status(status201)
    .json({_id: response.id, name, quantity});
};

const getAll = async (_req, res) => {
  const response = await productService.getAll();
  return res
    .status(status200)
    .json({products: response });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await productService.getById(id);
  if ( !response ) {
    return res
      .status(status422)
      .json({ 'err':
      {'code': 'invalid_data',
        'message': 'Wrong id format'}});
  }
  return res
    .status(status200)
    .json(response);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  const response = await productService.updateById(id, name, quantity);
  if ( response['err']) {
    return res
      .status(status422)
      .json(response);
  }

  return res
    .status(status200)
    .json(response);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById
};
