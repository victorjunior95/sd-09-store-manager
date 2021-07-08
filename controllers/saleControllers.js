const saleServices = require('../services/saleServices');

const postSales = async (req, res) => {
  const data = req.body;
  const request = await saleServices.postSales(data);

  res.status(request.status).json(request.response);
};

const getAllSales = async (req, res) => {
  const request = await saleServices.getAllSales();

  return res.status(request.status).json(request.response);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const request = await saleServices.getSaleById(id);
  return res.status(request.status).json(request.response);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const request = await saleServices.editSale(body, id);
  res.status(request.status).json(request.response);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const request = await saleServices.deleteSale(id);

  return res.status(request.status).json(request.response);
};

module.exports = {
  postSales,
  getAllSales,
  getSaleById,
  editSale,
  deleteSale,
};