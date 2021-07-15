const sale = require('../services/salesServices');
const sales = require('../models/salesModel');

const createSale = async (req, res) => {
  const newSale = await sale.createSale(req.body);
  if (newSale.err) res.status(422).json(newSale);
  return res.status(200).json(newSale);
};

const listSales = async (_req, res) => {
  const list = await sales.getAllSales();
  if (!list.length) return res.status(404)
    .json({
      'err':
        { 'code': 'not_found', 'message': 'Sales not found' }
    }
    );
  res.status(200).json({ sales: list });
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  const saleById = await sale.findById(id);

  if (saleById.err) return res.status(404).json(saleById);
  return res.status(200).json(saleById);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  const saleUpdate = await sale.updateSale(id, productId, quantity);
  const saleById = await sale.findById(id);

  console.log(saleById);
  if (saleUpdate.err) return res.status(422).json(saleUpdate);
  return res.status(200).json(saleById);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const saleDeleted = await sale.deleteSale(id);

  console.log( await sale.deleteSale(id));
  if (saleDeleted.err) return res.status(422).json(saleDeleted);

  return res.status(200).json({ message: 'Product deleted successfully' });
};

module.exports = {
  createSale,
  listSales,
  listSalesById,
  updateSale,
  deleteSale
};