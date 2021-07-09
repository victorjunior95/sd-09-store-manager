const {
  register,
} = require('../services/salesServices');

const status200 = 200;

const salesRegister = async (req, res, next) => {
  const sales = req.body;
  try{
    const result = await register(sales);
    res.status(status200).json(result);
  } catch(error) {
    next(error);
  }
};

module.exports = {
  salesRegister,
};
