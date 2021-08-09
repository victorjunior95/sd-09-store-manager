const router = require('express').Router();
const { sales: salesController } = require('../controllers');

router.get('/:id', salesController.salesGetId);
router.get('/', salesController.salesIndex);
router.put('/:id', salesController.updateSale);
router.post('/', salesController.salesCreate);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
