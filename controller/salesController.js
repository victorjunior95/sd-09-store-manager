const salesService = require('../service/salesService');

const unprocessable = 422;
const status_ok = 200;
const not_found = 404;

const postSale = async (req, res) => {
  try {
    const sale = await salesService.newSale(req.body);
    return res.status(status_ok).json(sale);
  } catch(err) {
    return res.status(unprocessable).json(err);
  }
};

const getSales = async (req, res) => {
  const sales = await salesService.getAllSales();
  if (sales) return res.status(status_ok).json({ sales });
};

const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.findSale(id);
    return res.status(status_ok).json(sale);
  } catch(err) {
    return res.status(not_found).json(err);
  }
};

const putSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  try {
    const sale = { id, itensSold };
    await salesService.saleUpdate(id, itensSold);
    return res.status(status_ok).json(sale);
  } catch(err) {
    return res.status(unprocessable).json(err);
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.findSale(id);
    await salesService.deleteSaleById(id);
    return res.status(status_ok).json(sale);
  } catch(err) {
    return res.status(unprocessable).json(err);
  }
};

module.exports = { postSale, getSales, getSale, putSale, deleteSale };