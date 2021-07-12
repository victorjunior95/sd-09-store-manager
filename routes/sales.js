const router = require('express').Router();
const { salesController } = require('../controllers');

router.post('/sales', salesController.create);

module.exports = router;
