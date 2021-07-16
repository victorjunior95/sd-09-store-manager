const salesServices = require('../../services/salesServices');
const unprocessableEntity = 422;
const okay = 200;

const insertOneSale = async (req, res) => {
  const productsSold = req.body;
  const sale = await salesServices.insertOneSale(productsSold);
  if (sale.err) {
    return res.status(unprocessableEntity).json(sale);
  }
  return res.status(okay).json(sale);
};

module.exports = {
  insertOneSale
};
