const salesService = require('../services/salesServices');
const status = require('../assistent/status');

const salesController = async (req, res) => {
  const productList = req.body;
  const sale = await salesService.generateSaleService(productList);
  if (sale.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(sale);
  }
  return res.status(status.OK).json(sale);
};

const getAllSalesController = async (req, res) => {
  const saleList =  await salesService.getAllSalesServices();
  if (saleList.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(saleList);
  }
  return res.status(status.OK).json({ sales: saleList});
};

const findOneSaleController = async (req, res) => {
  const { id } = req.params;
  const productList = await salesService.findOneSaleService(id);
  if (productList.err)  {
    return res.status(status.NOT_FOUND).json(productList);
  }
  return res.status(status.OK).json(productList);
};

module.exports = { 
  salesController,
  getAllSalesController,
  findOneSaleController,
};
