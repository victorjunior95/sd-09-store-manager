const express = require('express');
// const ProductsController = require('../controllers/productsController');
const ProductsController = require('../controllers/productsController');
const SalesRouter = require('../controllers/salesController');

const router = express.Router();

router.use('/products', ProductsController);
// quando for fazer as rotas e tratamentos de '/sales' usaremos outro controllers
// que vai lidar especificamente com cada verbo HTTP que chegar em '/sales'
router.use('/sales', SalesRouter);

router.use((error, _req, res, _next) => {
  // console.log('eror:', error);
  return res.status(error.code).json(error.err);
});

module.exports = router;
