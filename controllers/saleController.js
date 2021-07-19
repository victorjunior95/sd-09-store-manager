const { saleModel, productModel } = require('../models');
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
  try {
    const promises = body.map(async ({productId, quantity}) => {
      const product = await productModel.findById(productId);
      const minimunOfProducts = 0;
      if (product.quantity - quantity < minimunOfProducts) {
        throw new Error();
      }
      await productModel.updateQuantity(productId, -quantity);
    });
    await Promise.all(promises);
    const createdSale = await saleModel.save(body);
    return res.ok(createdSale);
  } catch (error) {
    const notFound = 404;
    return res.status(notFound).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    });
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
  sale.itensSold.map(async ({productId, quantity}) => {
    await productModel.updateQuantity(productId, quantity);
  });
  await saleModel.remove(id);
  return res.ok();
});

module.exports = router;
