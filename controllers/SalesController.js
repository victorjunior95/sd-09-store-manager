const SalesService = require('../services/SalesService');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../httpResponse');

const getAllSales = async (req, res) => {
  const { id } = req.body;

  if (!id) {

    const sales = await SalesService.getAllSales();
    return res.status(HTTP_OK_STATUS).send(sales);
  }
  const salesById = await SalesService.findById(id);
  return res.status(HTTP_OK_STATUS).send(salesById);

};

const addSale = async (req, res) => {
  const soldItens = req.body;
  const salesInfo = await SalesService.addSale(soldItens);

  return res.status(HTTP_OK_STATUS).send(salesInfo);
};

const editSale = async (req, res,) => {
  const { id } = req.params;
  const itensSold = req.body;

  const sale = await SalesService.editSale({id, itensSold});

  return res.status(HTTP_OK_STATUS).send(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const deleteProduct = await SalesService.deleteSale(id);

  return res.status(HTTP_OK_STATUS).send(deleteProduct);
};

module.exports = {
  getAllSales,
  addSale,
  editSale,
  deleteSale
};

