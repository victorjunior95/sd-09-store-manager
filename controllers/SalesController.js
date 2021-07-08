const saleValidation = require('../services/saleValidation');

const STATUS_CODE = {
  created: 201,
  ok: 200,
};

const addNewSale = async (req, res, next) => {
  const salesReq = req.body;

  let newSale;
  
  salesReq.length > 1
    ? newSale = await saleValidation.postValidateManySales(salesReq)
    :  newSale = await saleValidation
      .postValidateOneSale(salesReq[0].productId, salesReq[0].quantity);

  return newSale.err
    ? next(newSale)
    : res.status(STATUS_CODE.ok).json(newSale);
};

const getAllSales = async (_req, res, _next) => {
  const allSales = await saleValidation.getAllSales();

  return res.status(STATUS_CODE.ok).json({sales: allSales});
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await saleValidation.getSaleById(id);

  return sale.err
    ? next(sale)
    : res.status(STATUS_CODE.ok).json(sale);
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
};
