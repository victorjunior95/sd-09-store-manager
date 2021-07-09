const { createSale } = require('../services/salesService');
const { ok } = require('../services/httpStatusCode');

async function postSale(req, res, _next) {
  const sale = req.body;
  const result = await createSale(sale);
  res.status(ok).json(result);
}

module.exports = {
  postSale,
};
