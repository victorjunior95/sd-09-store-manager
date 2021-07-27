const express = require('express');
const { listAllSales } = require('../models/salesModel');
const {
  createSaleService,
  listSaleByIdService,
  updateSaleService,
} = require('../services/salesServices');

const router = express.Router();
const code = 'invalid_data';
const OK_STATUS = 200;
const CREATED_STATUS = 201;

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const [newSale] = await createSaleService(body);

    return res.status(OK_STATUS).json(newSale);
  } catch (err) {
    const { message } = err;

    return res.status(err.status).json({ err: { code, message } });
  }
});

router.get('/', async (_req, res) => {
  const sales = await listAllSales();

  return res.status(OK_STATUS).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { params: { id } } = req;

  try {
    const [sale] = await listSaleByIdService(id);

    return res.status(OK_STATUS).json( sale );
  } catch (err) {
    const { message } = err;

    return res.status(err.status).json({
      err: {
        code: 'not_found',
        message
      }
    });
  }
});

router.put('/:id', async (req, res) => {
  const { params: { id }, body } = req;

  try {
    await updateSaleService(id, body);

    return res.status(OK_STATUS).json({ _id: id, itensSold: [...body] });
  } catch (err) {

    return res.status(err.status).json({
      err: {
        code: 'invalid_data',
        message: err.message
      }
    });
  }
});

module.exports = router;
