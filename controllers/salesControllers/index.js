const salesServices = require('../../services/salesServices');
const unprocessableEntity = 422;
const notFound = 404;
const okay = 200;

const insertOneSale = async (req, res) => {
  const productsSold = req.body;
  const sale = await salesServices.insertOneSale(productsSold);
  if (sale.err) {
    return res.status(unprocessableEntity).json(sale);
  }
  return res.status(okay).json(sale);
};

const getAllSales = async (_req, res) => {
  const allSales = await salesServices.getAllSales();
  return res.status(okay).json(allSales);
};

const getOneSaleById = async (req, res) => {
  const { id } = req.params;
  const saleById = await salesServices.getOneSaleById(id);
  if (saleById.err) {
    return res.status(notFound).json(saleById);
  }
  return res.status(okay).json(saleById);
};

const updateOneSale = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  const updatedSale = await salesServices.updateOneSale(id, productId, quantity);
  if (updatedSale.err) {
    return res.status(unprocessableEntity).json(updatedSale);
  }
  return res.status(okay).json(updatedSale);
};

module.exports = {
  insertOneSale,
  getAllSales,
  getOneSaleById,
  updateOneSale
};
