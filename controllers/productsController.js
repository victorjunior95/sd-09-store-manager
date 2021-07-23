const express = require('express');

const { listAllProducts } = require('../models/productsModel');
const {
  createProductService,
  listProductByID,
  updateProductSevice,
  deleteProductService,
} = require('../services/productServices');

const router = express.Router();
const OK_STATUS = 200;
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

router.get('/', async (_req, res) => {
  const products = await listAllProducts();

  return res.status(OK_STATUS).json({ products });
});

router.get('/:id', async (req, res) => {
  const { params: { id } } = req;

  try {
    const [product] = await listProductByID(id);

    return res.status(OK_STATUS).json(product);
  } catch (err) {
    
    return res.status(err.status).json({
      err: {
        code: 'invalid_data',
        message: err.message
      }
    });
  }
});

router.put('/:id', async (req, res) => {
  const { params: { id }, body } = req;

  try {
    await updateProductSevice(id, body);

    return res.status(OK_STATUS).json({ _id: id, ...body });

  } catch (err) {

    return res.status(err.status).json({
      err: {
        code: 'invalid_data',
        message: err.message
      }
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { params: { id } } = req;

  try {
    const deletedProd = await deleteProductService(id);

    return res.status(OK_STATUS).json(deletedProd);
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
