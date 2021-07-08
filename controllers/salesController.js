const httpCodes = require('../auxiliarFunctions/httpCodes');
const salesServices = require('../services/salesServices');

// 5 - Crie um endpoint para cadastrar vendas
const postNewSale = async (req, res, next) => {
  const mySaleArray = req.body;
  const result = await salesServices.postNewSale(mySaleArray);

  if (result.err) return next(result.err);

  res.status(httpCodes.ok).json({
    _id: result,
    itensSold: mySaleArray,
  });
};

module.exports = {
  postNewSale,
};
