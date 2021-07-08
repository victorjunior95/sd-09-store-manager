const salesService = require('../services/salesService');

const status422 = 422;
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

module.exports = {
  create,
};
