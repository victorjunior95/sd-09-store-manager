const { min } = require('../validators');

const router = require('express').Router();

function createSaleValidator(req, res, next) {
  const { body } = req;
  body.some((sale) => {
    const { quantity, productId } = sale;
    if (min(quantity, 1) || !Number(quantity) || !productId) {
      res.invalidData('Wrong product ID or invalid quantity');
      return true;
    }
  });
  return next();
}

router.post('/', createSaleValidator, async (req, res) => {
  const { body } = req;
  body.forEach((sale) => {
    const { quantity, productId } = sale;

  });
  return res.created();
});

module.exports = router;
