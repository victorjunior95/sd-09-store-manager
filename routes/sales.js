const {
  postSales,
  getSales,
  getSaleById,
  putSale,
  deleteSale
} = require('../controllers/sales');

const express = require('express');
const router = express.Router();

router.post('/', postSales);

router.delete('/:id', deleteSale);

router.get('/:id', getSaleById);
router.get('/', getSales);

router.put('/:id', putSale);

module.exports = router;
