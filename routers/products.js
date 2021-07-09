const express = require('express');
const router = express.Router();
const rescue = require('express-rescue');


const productController = require('../controllers/productController');

router.post('/', rescue(productController.create));

router.put('/:id', rescue(productController.updateById));

router.get('/:id', rescue(productController.getById));

router.get('/', productController.getAll);

router.delete('/:id', rescue(productController.deleteById));

module.exports = router;
