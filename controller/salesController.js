const salesService = require('../service/salesService');

const registerSales = async (req, res) => {
  const sales = req.body;
  const { status, response } = await salesService.register(sales);

  res.status(status).json(response);
};

const listSales = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await salesService.list(id);

  res.status(status).json(response);
};

const updateSale= async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const { status, response } = await salesService.update(id, sales);

  res.status(status).json(response);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await salesService.remove(id);

  res.status(status).json(response);
};

module.exports = {
  registerSales,
  listSales,
  updateSale,
  deleteSale
};
