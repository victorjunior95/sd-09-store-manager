const Sales = require('../services/Sales');
const rescue = require('express-rescue');

const newSale = rescue(async (req, res) => {
  const sale = req.body;
  const { status, addSale } = await Sales.newSale(sale);
  res.status(status).json(addSale);
});

module.exports = {
  newSale
};
