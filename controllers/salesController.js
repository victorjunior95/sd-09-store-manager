const {
  registerSalesService,
  getAllSalesService,
  getSalesByIdService,
  updateSalesByIdService,
  deleteSalesByIdService,
} = require('../services/salesService');

const registerSalesController = async (req, res) => {
  const { body } = req;
  const result = await registerSalesService(body);
  const { code, response } = result;
  res.status(code).json(response);
};

const getAllSalesController = async (_req, res) => {
  const result = await getAllSalesService();
  const { code, response } = result;
  res.status(code).json(response);
};

const getSalesByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await getSalesByIdService(id);
  const { code, response } = result;
  res.status(code).json(response);
};

const updateSalesByIdController = async (req, res) => {
  const { params: { id } } = req;
  const { body } = req;
  const result = await updateSalesByIdService(id, body);
  const { code, response } = result;
  res.status(code).json(response);
};

const deleteSalesByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await deleteSalesByIdService(id);
  const { code, response } = result;
  res.status(code).json(response);
};

module.exports = {
  registerSalesController,
  getAllSalesController,
  getSalesByIdController,
  updateSalesByIdController,
  deleteSalesByIdController,
};
