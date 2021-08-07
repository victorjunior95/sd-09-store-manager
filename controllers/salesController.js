const salesService = require('../services/salesService');
const STATUS_OK = 200;
const CREATE_OK = 201;
const UNPROCESSABLE_ENTITY = 422;
const MIN_QUANTITY = 0;

async function registerSales(req, res) {
  const { productId, quantity } = req.body;
  const newSales = await salesService.registerSales(productId, quantity);

  if (newSales.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(newSales);
  }

  return res.status(STATUS_OK).json(newSales);
};

async function getAllSalesController(_req, res) {
  const allSales = await salesService.getAllSalesService();

  return res.status(STATUS_OK).json(allSales);
};

async function getSalesIdController(req, res) {
  const { id }= req.params;
  const salesId = await salesService.getSalesIdService(id);

  return res.status(STATUS_OK).json(salesId);
};

async function salesUpdateController(req, res) {
  const { productId, quantity } = req.body;
  const { id } = req.params;

  if (quantity <= MIN_QUANTITY || typeof quantity !== 'number') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  const newSales = await salesService.salesUpdateService(id, productId, quantity);

  return res.status(STATUS_OK).json(newSales);
  
};

module.exports = {
  registerSales,
  getAllSalesController,
  getSalesIdController,
  salesUpdateController,
};
