const salesServices = require('../services/sales/salesServices');

const ok = 200;

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

const findAll = async (_req, res) => {
  const result = await salesServices.findAll();
  return res.status(ok).json({ sales: result });
};

const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.findById(id);

  if (result.message) {
    const { status, code, message } = result;
    return res.status(status).json({
      err: {
        code: code,
        message: message,
      },
    });
  }

  return res.status(ok).json(result);
};

module.exports = {
  createSales,
  findAll,
  findOne,
};
