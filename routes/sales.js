const router = require('express').Router();
const { salesController } = require('../controllers');

router.post('/sales', salesController.create);

router.get('/sales', salesController.getAll);

router.get('/sales/:id', salesController.get);

module.exports = router;
