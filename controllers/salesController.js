const salesService = require('../services/salesService');

const status422 = 422;
const status404 = 404;
const status201 = 201;
const status200 = 200;


const create = async (req, res) => {
  const sales = req.body;
  const response = await salesService.create(sales);
  console.log('response', response);
  if ( response['err']) {
    return res
      .status(status422)
      .json(response);
  }

  return res
    .status(status200)
    .json(response);
};

const getAll = async (_req, res) => {
  const response = await salesService.getAll();
  return res
    .status(status200)
    .json({sales: response });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getById(id);
  if ( !response ) {
    return res
      .status(status404)
      .json({ 'err':
      {'code': 'not_found',
        'message': 'Sale not found'}});
  }
  return res
    .status(status200)
    .json(response);
};

module.exports = {
  create,
  getAll,
  getById
};
