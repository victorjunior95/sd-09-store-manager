const {
  createService,
  getAllService,
  getByIdService,
  updateService,
  deleteService,
} = require('../services/SalesService');

// response status code
const OK = 200;
const CREATED = 201;

const getAllSales = async (_req, res) => {
  const sales = await getAllService();

  res.status(OK).json({ sales });
};

const createSales = async (req, res) => {
  const products = req.body;
  const sales = await createService(products);

  if (sales.isError === true) return res.status(sales.status).json({err: sales.err});

  res.status(OK).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sales = await getByIdService(id);

  if (sales.isError) return res.status(sales.status).json(sales);

  res.status(OK).json(sales);
};

const updateSale = async (req, res) => {
  const requestedSales = req.body;
  const { id } = req.params;

  const sales = await updateService(id, requestedSales);

  if (sales.isError) return res.status(sales.status).json(sales);

  res.status(OK).json(sales);
};

const deleteOneSale = async (req, res) => {
  const { id } = req.params;

  const sale = await deleteService(id);

  if (sale.isError) return res.status(sale.status).json(sale);

  res.status(OK).json(sale);
};

module.exports = {
  getAllSales,
  createSales,
  getSaleById,
  updateSale,
  deleteOneSale,
};