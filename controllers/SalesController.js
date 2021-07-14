const saleServices = require('../services/SaleService');

const addNewSale = async (req, res) => {
  const response = await saleServices.addSale(req.body);
  return res.status(response.status).json(response.result);
};

const listSale = async (req, res) => {
  const { id } = req.params;
  const response = await saleServices.list(id);
  return res.status(response.status).json(response.result);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const response = await saleServices.updateSale(req.body, id);
  return res.status(response.status).json(response.result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const response = await saleServices.deleteSale(id);
  return res.status(response.status).json(response.result);
};

module.exports = {
  addNewSale,
  listSale,
  updateSale,
  deleteSale
};