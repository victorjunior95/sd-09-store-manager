const express = require('express');
const router = express.Router();
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');

router.post('/', rescue(salesController.create));

router.get('/:id', rescue(salesController.getById));

router.get('/', salesController.getAll);

router.put('/:id', rescue(salesController.updateById));

router.delete('/:id', rescue(salesController.deleteById));


module.exports = router;
