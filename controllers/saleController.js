const saleService = require('../services/saleService');

const stateFail = 422;
const stateOk = 200;

const createNewSale = async (req, res, _next) => {
  const newSale = await saleService.createSale(req.body);

  if(newSale.err) return res.status(stateFail).json(newSale);

  return res.status(stateOk).json(newSale);
};

const listAllSales = async (_req, res, _next) => {
  const list = await saleService.salesList();

  return res.status(stateOk).json(list);
};

module.exports = {
  createNewSale,
  listAllSales,
};