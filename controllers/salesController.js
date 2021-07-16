const salesService = require('../services/salesService');
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;
//const CREATED = 201;
const OK = 200;

const newSale = async (req, res) => {
  const items = req.body;

  const createSale = await salesService.createSale(items);

  if(createSale.err){
    return res.status(UNPROCESSABLE).json(createSale);
  }
  return res.status(OK)
    .json( createSale );
};

const getSaleById = async (req, res) => {
  const {id} = req.params;
  const getSale = await salesService.getById(id);
  if (!getSale){
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
  return await res.status(OK).json(getSale);
};

const getSales = async (_req, res) => {
  const getSale = await salesService.getAllSales();
  if (!getSale){
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
  return res.status(OK).json({sales: getSale});
};

const updateSale = async (req, res) => {
  const items = req.body;
  const {id} = req.params;
  const updateSale = await salesService.updateSale(id, items);
  if(!updateSale){
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  return res.status(OK).json(updateSale);
};

const deleteSale = async (req, res) => {
  const {id} = req.params;
  const deleteSale = await salesService.deleteSale(id);
  if(!deleteSale){
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
  return res.status(OK).json(deleteSale);
};

module.exports = {
  newSale,
  getSaleById,
  getSales,
  updateSale,
  deleteSale,
};