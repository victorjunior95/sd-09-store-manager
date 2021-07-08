const express = require('express');
// const ProductsController = require('../controllers/productsController');
const ProductsRouter = require('../controllers/productsController');
const SalesRouter = require('../controllers/productsController');

const router = express.Router();

router.use('/products', ProductsRouter);
// quando for fazer as rotas e tratamentos de '/sales' usaremos outro controllers
// que vai lidar especificamente com cada verbo HTTP que chegar em '/sales'
router.use('/sales', SalesRouter);

module.exports = router;
