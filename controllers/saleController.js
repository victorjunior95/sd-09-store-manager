const { saleModel } = require('../models');
const { min } = require('../validators');

const router = require('express').Router();

function createSaleValidator(req, res, next) {
  const { body } = req;
  const hasSomeError = body.some((sale) => {
    const { quantity, productId } = sale;
    if (min(quantity, 1) || !Number(quantity) || !productId) {
      res.invalidData('Wrong product ID or invalid quantity');
      return true;
    }
  });
  if (hasSomeError) return;
  return next();
}

router.post('/', createSaleValidator, async (req, res) => {
  const { body } = req;
  const createdSale = await saleModel.save(body);
  return res.ok(createdSale);
});

module.exports = router;
