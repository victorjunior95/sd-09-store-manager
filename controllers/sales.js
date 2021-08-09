const sales = require('../services/sales');

const postSale = (request, response) => sales.postSale(request.body)
  .then(({ status, data }) => response.status(status).json(data));

const getAllSales = (request, response) => sales.getAllSales(request.body)
  .then(({ status, data }) => response.status(status).json(data));

const getSalesbyId = (request, response) => sales.getSalesbyId(request.body)
  .then(({ status, data }) => response.status(status).json(data));

const putSale = (request, response) => sales.putSale(request.body)
  .then(({ status, data }) => response.status(status).json(data));

const deleteSale = (request, response) => sales.deleteSale(request.body)
  .then(({ status, data }) => response.status(status).json(data));

module.exports = {
  postSale,
  getAllSales,
  getSalesbyId,
  putSale,
  deleteSale,
};
