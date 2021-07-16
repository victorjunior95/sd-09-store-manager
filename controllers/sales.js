const salesService = require('../services/sales');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const postSales = async (req, res) => {
  try {
    const sales = req.body;

    const result = await salesService.addSales(sales);

    if(result.err) {
      const { status, ...rest } = result;
      return res.status(status).send(rest);
    }
    
    return res
      .status(HTTP_STATUS_OK)
      .send(result);
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await salesService.getAllSales();

    return res
      .status(HTTP_STATUS_OK)
      .send(sales);
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);

    if (sale.err) {
      const { status, ...rest } = sale;
      return res.status(status).send(rest);
    }

    return res
      .status(HTTP_STATUS_OK)
      .send(sale);
    
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const putSale = async (req, res) => {
  try {
    const sale = req.body;
    const { id } = req.params;

    const result = await salesService.updateSale(id, sale);

    if(result.err) {
      const { status, ...rest } = result;
      return res.status(status).send(rest);
    }

    return res
      .status(HTTP_STATUS_OK)
      .send(result);    
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSale(id);

    if(result.err) {
      const { status, ...rest } = result;
      return res.status(status).send(rest);
    }

    return res
      .status(HTTP_STATUS_OK)
      .send(result);    
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

module.exports = {
  postSales,  
  getSales,
  getSaleById,
  putSale,
  deleteSale,
};
