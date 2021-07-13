const {Router} = require('express');

const router = Router();

const SalesController = require('../controllers/SalesController');

router.post('/', SalesController.create);
router.get('/', SalesController.getAll);
router.get('/:id', SalesController.findById);
router.put('/:id', SalesController.updateOne);

module.exports = router;