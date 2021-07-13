const { createSaleService } = require('../services/salesService');
const { httpStatusCode: { ok } } = require('../utils');

const createSaleController = async (req, res, next) => {
  try {
    const sales = req.body;
    const teste = await createSaleService(sales);
    return res.status(ok).json(teste);
  } catch(error) {
    return next(error);
  }
};

module.exports = { 
  createSaleController 
};
