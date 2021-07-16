const salesService = require('../services/salesService');

const { HTTP_OK_STATUS } = require('../httpResponse');

const postNewSale = async (req, res) => {
  const soldItens = req.body;
  const salesInfo = await salesService.postNewSales(soldItens);

  return res.status(HTTP_OK_STATUS).send(salesInfo);
};

module.exports = {
  postNewSale,
};