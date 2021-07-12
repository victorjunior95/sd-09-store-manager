const SalesService = require('../services/SalesServices');

const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_INVALID = 400;
const STATUS_NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const createSale = async (req, res) => {
  const SoldList = req.body;
  const SaleRes = await SalesService.create(SoldList);
  if (SaleRes.err) return res.status(UNPROCESSABLE_ENTITY).json(SaleRes);
  if (!SaleRes) return res.status(STATUS_NOT_FOUND).json(SaleRes);

  return res.status(STATUS_OK).json(SaleRes);
};

const getAll = async (_req, res) => {

  const sales = await SalesService.getAll();

  return res.status(STATUS_OK).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { body } = res;
  const sale = await SalesService.findById(id);
  if(sale.err) return res.status(STATUS_NOT_FOUND).json(sale);
  return res.status(STATUS_OK).json(sale);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  const sale = await SalesService.editSale(id, productId, quantity);
  if(sale.err) return res.status(UNPROCESSABLE_ENTITY).json(sale);
  return res.status(STATUS_OK).json(sale);
};

const removeSale = async (req, res) => {
  const { id } = req.params;

  const removedSale = await SalesService.removeSale(id);
  if(removedSale.err) return res.status(UNPROCESSABLE_ENTITY).json(removedSale);
  
  return res.status(STATUS_OK).json(removedSale);;
};


module.exports = {
  createSale,
  getAll,
  findById,
  editSale,
  removeSale,
};