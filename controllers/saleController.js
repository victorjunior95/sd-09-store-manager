const saleService = require('../services/saleService');

const stateFail = 422;
const stateOk = 200;
const stateNotFound = 404;

const createNewSale = async (req, res, _next) => {
  const newSale = await saleService.createSale(req.body);

  if(newSale.err) return res.status(stateFail).json(newSale);

  return res.status(stateOk).json(newSale);
};

const listAllSales = async (_req, res, _next) => {
  const list = await saleService.salesList();

  return res.status(stateOk).json(list);
};

const findSaleById = async (req, res, _next) => {
  const { id } = req.params;
  const selectSale = await saleService.findSale(id);

  if(selectSale.err) return res.status(stateNotFound).json(selectSale);

  return res.status(stateOk).json(selectSale);
};

const updateSaleData = async (req, res, _next) => {
  const { id } = req.params;
  const updateSale = await saleService.updateSale(id, req.body);

  if(updateSale.err) return res.status(stateFail).json(updateSale);

  return res.status(stateOk).json(updateSale);
};

const deleteSaleData = async (req, res, _next) => {
  const { id } = req.params;
  const deletedSale = await saleService.deleteSale(id);

  if(deletedSale.err) return res.status(stateFail).json(deletedSale);

  return res.status(stateOk).json(deletedSale);
};

module.exports = {
  createNewSale,
  listAllSales,
  findSaleById,
  updateSaleData,
  deleteSaleData,
};