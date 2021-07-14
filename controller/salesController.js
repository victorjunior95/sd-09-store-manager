const salesService = require('../service/salesService');

const unprocessable = 422;
const status_ok = 200;
const not_found = 404;

const postSale = async (req, res) => {
  try {
    const sale = await salesService.newSale(req.body);
    if(sale.err) return res.status(unprocessable).json(sale);
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
  const sale = await salesService.findSale(id);
  if(sale.err) return res.status(not_found).json(sale);
  return res.status(status_ok).json(sale);
};

module.exports = { postSale, getSales, getSale };