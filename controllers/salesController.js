const salesServices = require('../services/sales/salesServices');

const createSales = async (req, res) => {
  const sales = req.body;

  const result = await salesServices.create(sales);

  if (result.message) {
    const { status, code, message } = result;
    return res.status(status).json({
      err: {
        code: code,
        message: message,
      },
    });
  }

  return res.status(result.status).json(result.createdSales);
};

module.exports = {
  createSales,
};
