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

const upDateSale = async (req, res) => {
  const itensSold = req.body;
  const { id } = req.params;

  const saleUpDated = await salesService.upDateSale({ id, itensSold });
  return res.status(HTTP_OK_STATUS).send(saleUpDated);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const saleDeleted = await salesService.deleteSale(id);
  return res.status(HTTP_OK_STATUS).send(saleDeleted);
};

module.exports = {
  postNewSale,
  getSales,
  upDateSale,
  deleteSale,
};