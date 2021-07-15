const sale = require('../services/salesServices');
const sales = require('../models/salesModel');
const HTTP = require('../httpStatusCodeList');

const createSale = async (req, res) => {
  const newSale = await sale.createSale(req.body);
  if (newSale.err) res.status(HTTP.unprocessableEntity).json(newSale);
  return res.status(HTTP.ok).json(newSale);
};

const listSales = async (_req, res) => {
  const list = await sales.getAllSales();
  if (!list.length) return res.status(HTTP.notFound)
    .json({
      'err':
        { 'code': 'not_found', 'message': 'Sales not found' }
    }
    );
  res.status(HTTP.ok).json({ sales: list });
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  const saleById = await sale.findById(id);

  if (saleById.err) return res.status(HTTP.notFound).json(saleById);
  return res.status(HTTP.ok).json(saleById);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  const saleUpdate = await sale.updateSale(id, productId, quantity);
  const saleById = await sale.findById(id);

  console.log(saleById);
  if (saleUpdate.err) return res.status(HTTP.unprocessableEntity).json(saleUpdate);
  return res.status(HTTP.ok).json(saleById);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const saleDeleted = await sale.deleteSale(id);

  if (saleDeleted.err) return res.status(HTTP.unprocessableEntity).json(saleDeleted);
  return res.status(HTTP.ok).json({ message: 'Product deleted successfully' });
};

module.exports = {
  createSale,
  listSales,
  listSalesById,
  updateSale,
  deleteSale
};