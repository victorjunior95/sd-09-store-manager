const service = require('../service/salesService');
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

const findSales = async (_req, res) => {
  const sales = await service.findSales();

  return res.status(status.d).json({sales});
};

const findSalesId = rescue(
  async (req, res) => {
    const { id } = req.params;
    const retorne = await service.findSalesId(id);

    return res.status(status.d).json(retorne);
  }
);

const updateSales = rescue(
  async (req, res) => {
    const { id } = req.params;
    const sale = req.body;
    const retorne = await service.updateSales(id, sale);

    return res.status(status.d).json(retorne);
  }
);

const deletesales = rescue(
  async (req, res) => {
    const { id } = req.params;
    const retorne = await service.deleteSales(id);

    return res.status(status.d).json(retorne);
  }
);

module.exports = {
  createSales,
  findSales,
  findSalesId,
  updateSales,
  deletesales
};