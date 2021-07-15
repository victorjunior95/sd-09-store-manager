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

const editOneSaleController = async (req, res) => {
  const { id } = req.params;
  const updatedSale = await salesService.editOneSaleService(id, req.body);
  if (updatedSale.err) {
    console.log('entrou no erro');
    return res.status(status.UNPROCESSABLE_ENTITY).json(updatedSale);
  }
  return res.status(status.OK).json(updatedSale);
};

const deleteSaleController = async (req, res) => {
  const { id } = req.params;
  const saleDeleted = await salesService.deleteSaleService(id);
  if (saleDeleted.err) return res.status(status.UNPROCESSABLE_ENTITY).json(saleDeleted);
  return res.status(status.OK).json(saleDeleted);
};

module.exports = { 
  salesController,
  getAllSalesController,
  findOneSaleController,
  editOneSaleController,
  deleteSaleController,
};
