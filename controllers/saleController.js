const { saleModel, productModel } = require('../models');
const CreateSaleService = require('../services/createSaleService');
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
  try {
    const { body } = req;
    const createSaleService = new CreateSaleService(productModel, saleModel);
    const createdSale = await createSaleService.execute(body);
    return res.ok(createdSale);
  } catch (error) {
    return res.notFound('Such amount is not permitted to sell', 'stock_problem');
  }
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await saleModel.findById(id);
  if (!sale) {
    return res.invalidData('Wrong sale ID format');
  }
  sale.itensSold.map(async ({ productId, quantity }) => {
    await productModel.updateQuantity(productId, quantity);
  });
  await saleModel.remove(id);
  return res.ok();
});

module.exports = router;
