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

router.get('/', async (_req, res) => {
  const sales = await saleModel.findAll();
  res.ok({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await saleModel.findById(id);
  if (!sale) {
    return res.notFound('Sale not found');
  }
  return res.ok(sale);
});

router.put('/:id', createSaleValidator, async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  await saleModel.update({ id, productId, quantity });
  return res.ok({ _id: id, itensSold: [{ productId, quantity }] });
});

module.exports = router;
