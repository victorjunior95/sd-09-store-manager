const express = require('express');
const createProductService = require('../services/productServices');

const router = express.Router();
const CREATED_STATUS = 201;

router.post('/', async (req, res) => {
  const { body } = req;

  try {
    const registeredProduct = await createProductService(body);
    const { ops: [ newProduct ] } = registeredProduct;

    return res.status(CREATED_STATUS).send(newProduct);

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
