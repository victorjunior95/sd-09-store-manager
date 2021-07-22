const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('lol on sales');
  return res.send('sales');
});

router.get('/weird', (req, res) => {
  console.log('lol weird on sales');
  return res.send('sales weird');
});

module.exports = router;
