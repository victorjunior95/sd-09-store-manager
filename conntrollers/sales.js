const salesService = require('../service/sales');

const sucess = 200;

const create = async(req, res) => {
  const sales = req.body;
  const cadastroSale = await salesService.create(sales);
  res.status(sucess).json(cadastroSale);
};

const getAllSales = async(req, res) => {
  const sales = await salesService.getAllSales();
  res.status(sucess).json({ sales });
};

const getIdSales = async(req, res) => {
  const { _id } = req.params;
  const findId = await salesService.getSalesId(_id);
  return res.status(sucess).json(findId);
};

const editSale = async(req, res) => {
  const { _id } = req.params;
  const sale = req.body;
  const edit = await salesService.editSale(_id, sale);
  res.status(sucess).json(edit);
};

const deleteSale = async(req, res) => {
  const { _id } = req.params;
  const deleteSale = await salesService.deleteSale(_id);
  res.status(sucess).json(deleteSale);
};

module.exports = { create, getAllSales, getIdSales, editSale, deleteSale };
