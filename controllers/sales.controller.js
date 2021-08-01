const salesService = require('../services/sales.service');

const createSales = async (req, res) => {
  try {
    const { body } = req;
    const { data, status } = await salesService.createSales(body);

    return res.status(status).json(data);
  }
  catch({ status, data }) { return res.status(status).json(data); }
};

module.exports = {
  createSales
};
