const salesService = require('../service/salesService');

const unprocessable = 422;
const status_ok = 200;

const postSale = async (req, res) => {
  try {
    const sale = await salesService.newSale(req.body);
    // if(sale.err) return res.status(unprocessable).json(sale);
    return res.status(status_ok).json(sale);
  } catch(err) {
    return res.status(unprocessable).json(err);
  }
};

module.exports = { postSale };