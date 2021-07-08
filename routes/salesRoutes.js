const express = require('express');
const SalesController = require('../controllers/salesController');
const salesCheckMiddleware = require('../middlewares/salesCheckMiddleware');
const router = express.Router();

router.post('/', salesCheckMiddleware, SalesController.create);

router.get('/', SalesController.getAll);

router.get('/:id', SalesController.findById);

router.put('/:id', salesCheckMiddleware, SalesController.updateById);

router.delete('/:id', SalesController.deleteById);

module.exports = router;
