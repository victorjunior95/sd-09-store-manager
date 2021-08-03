const Service = require('../services');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_STATUS = 422;

const addSales = async (req, res) => {
  const sales = await Service.sales.addSales(req.body);

  if (sales.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(sales);

  res.status(HTTP_CREATED_STATUS).json(sales);
};

const getSales = async (_req, res) => {
  const sales = await Service.sales.getSales();

  res.status(HTTP_OK_STATUS).json(sales);
};

module.exports = {
  addSales,
  getSales,
};
