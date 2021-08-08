const sales = require('../services/Sales');

const CONFIRM = 200;

const create = async (req, res, next) => {
  const item = req.body;

  const newSale = await sales.create(item);

  if(newSale.error) return next(newSale);

  res.status(CONFIRM).json(newSale);
};

module.exports = {
  create
};