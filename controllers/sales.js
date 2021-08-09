const { sales: salesServices } = require('../services');
const { httpCodes } = require('../utils');

exports.salesIndex = async (_req, res, next) => {
  try {
    const sales = await salesServices.getAllService();
    res.status(httpCodes.HTTP_OK).json({ sales });
  } catch (error) {
    next(error);
  }
};

exports.salesGetId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await salesServices.getByIdService(id);
    res.status(httpCodes.HTTP_OK).json(sale);
  } catch (error) {
    next(error);
  }
};
exports.salesCreate = async (req, res, next) => {
  const itensSold = req.body;
  try {
    const sales = await salesServices.createService({ itensSold });
    res.status(httpCodes.HTTP_OK).json(sales.ops[0]);
  } catch (error) {
    next(error);
  }
};

exports.updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    await salesServices.updateSaleService(id, { itensSold });
    const newSaleInfo = await salesServices.getByIdService(id);
    res.status(httpCodes.HTTP_OK).json(newSaleInfo);
  } catch (error) {
    next(error);
  }
};

exports.deleteSale =  async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSale = await salesServices.deleteSaleService(id);
    res.status(httpCodes.HTTP_OK).json(deletedSale);
  } catch (error) {
    next(error);
  }
};
