const {Router} = require('express');

const router = Router();

const SalesController = require('../controllers/SalesController');

router.post('/', SalesController.create);

module.exports = router;