const Service = require('../services');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNPROCESSABLE_STATUS = 422;

const addSales = async (req, res) => {
  const sale = await Service.sales.addSales(req.body);

  if (sale.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(sale);

  res.status(HTTP_CREATED_STATUS).json(sale);
};

const getSales = async (_req, res) => {
  const sales = await Service.sales.getSales();

  res.status(HTTP_OK_STATUS).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.sales.getSaleById(id);

  if (sale.err) return res.status(HTTP_NOT_FOUND_STATUS).json(sale);

  res.status(HTTP_OK_STATUS).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.sales.updateSale(id, req.body);

  if (sale.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(sale);

  res.status(HTTP_OK_STATUS).json(sale);
};

module.exports = {
  addSales,
  getSales,
  getSaleById,
  updateSale,
};
