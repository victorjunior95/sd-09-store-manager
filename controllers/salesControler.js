const salesService = require('../services/salesService');

const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../httpResponse');

const postNewSale = async (req, res) => {
  const soldItens = req.body;
  const salesInfo = await salesService.postNewSales(soldItens);

  return res.status(HTTP_OK_STATUS).send(salesInfo);
};

const getSales = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    const sales = await salesService.getAllSales();
    return res.status(HTTP_OK_STATUS).send(sales);
  }

  const salesById = await salesService.getSalesById(id);
  return res.status(HTTP_OK_STATUS).send(salesById);
};

module.exports = {
  postNewSale,
  getSales,
};