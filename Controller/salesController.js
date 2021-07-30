const service = require('../Service/salesService');
const rescue = require('express-rescue');
const status = {
  d: 200,
};

const createSales = rescue(
  async (req, res) => {
    const sales = req.body;
    const retorne = await service.createSales(sales);

    return res.status(status.d).json(retorne);
  }
);

module.exports = {
  createSales,
};