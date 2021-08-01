const salesService = require('../services/sales.service');

const createSales = async (req, res) => {
  try {
    const { body } = req;
    const { data, status } = await salesService.createSales(body);

    return res.status(status).json(data);
  }
  catch({ status, data }) { return res.status(status).json(data); }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, status } = await salesService.getSaleById(id);

    return res.status(status).json(data);
  }
  catch({ status, data }) { return res.status(status).json(data); }
};

const getSalesList = async (__, res) => {
  try {
    const { data, status } = await salesService.getSalesList();

    return res.status(status).json(data);
  }
  catch({ status, data }) { return res.status(status).json(data); }
};

const updateSales = async (req, res) => {
  try {
    const { params: { id }, body } = req;
    const { data, status } = await salesService.updateSaleById(id, body);

    return res.status(status).json(data);
  }
  catch({ status, data }) { return res.status(status).json(data); }
};



module.exports = {
  createSales,
  getSalesList,
  getSaleById,
  updateSales
};
