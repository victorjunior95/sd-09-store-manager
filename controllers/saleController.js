const sale = require('../services/salesServices');
const sales = require('../models/salesModel');

const createSale = async (req, res) => {

  const newSale = await sale.createSale(req.body);
  if (newSale.err) res.status(422).json(newSale);
  console.log(newSale.itensSold);
  return res.status(200).json(newSale);
};

const listSales = async (_req, res) => {
  const list = await sales.getAllSales();
  if (!list) return res.status(404)
    .json({
      'err':
        { 'code': 'not_found', 'message': 'Sales not found' }
    }
    );
  res.status(200).json({ sales: list });
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ id });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  res.status(200).json({ id, name, quantity });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: 'Product deleted successfully' });
};

module.exports = {
  createSale,
  listSales,
  listSalesById,
  updateSale,
  deleteSale
};