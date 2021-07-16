const saleService = require('../services/saleService');

const stateFail = 422;
const stateOk = 200;

const createNewSale = async (req, res, _next) => {
  const { itensSold } = req.body;
  
  const newSale = await saleService.createSale(itensSold);

  return res.status(stateOk).json(newSale);
};

module.exports = {
  createNewSale,
};