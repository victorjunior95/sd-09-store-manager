const express = require('express');
const { createSaleService } = require('../services/salesServices');

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

module.exports = router;
