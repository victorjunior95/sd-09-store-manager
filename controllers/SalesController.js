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

module.exports = {
  addNewSale,
};
