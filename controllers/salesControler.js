const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const { newsale, decrementpdt } = require('../models/salesModel');

const{
  validasale, asales, getsalebyid, updates, deleteonesale
} = require('../services/salesService');

const salenotf = {
  err: { code: 'not_found', message: 'Sale not found' }};


const cc = 200;
const cci = 201;
const z = 0;
const cdxxii = 422;
const cdiv = 404;


router.post('/', async(req, res) => {
  const arrvenda = (req.body);
  let result = await validasale(arrvenda);
  // console.log('scontro21', result);
  if(result == 'ok') {
    result = await newsale(arrvenda);
    await decrementpdt(arrvenda);
    res.status(cc).json(result);
    return;
  }else if(result.err.code == 'stock_problem'){
    res.status(cdiv).json(result);return;
  }else res.status(cdxxii).json(result);
});

router.get('/', async(req, res) => {  
   
  const sales = await asales();
  //console.log('control35', sales);
  res.status(cc).send(sales);
  return;
  
});


router.get('/:id', async(req, res) => {  
  const { id } = req.params;
  const sale = await getsalebyid(id);
  //console.log('controler:50', sale);
  let din = null;
  if(!sale ||sale.err){din = cdiv;}else{din = cc;};
  
  if(!sale){res.status(din).send(salenotf);}
  res.status(din).send(sale);
  return;
  
});

router.put('/:id', async(req, res) => {  
  const { id } = req.params;
  const  body = req.body;
  
  const updated = await updates(id,body);
  // console.log('contr66', updated);
  let dinamics = updated.err ? cdxxii: cc;
  res.status(dinamics).send(updated);
  return;
  
});


router.delete('/:id', async(req, res) => {  
  const { id } = req.params;
  const deleted = await Promise.all([deleteonesale(id)]);
  console.log('scontr79', deleted);
  let din = deleted[0].err ? cdxxii: cc;
  res.status(din).send(...deleted);
  return;
  

  // console.log('controler:77', deleted);
/*  if(deleted.error === cdiv){ res.status(cdiv).send(deleted);return;
  }else{  let dinamics = deleted !== null ? cc : cdxxii;
    res.status(dinamics).send(deleted);
    return;}
  */ 
});



module.exports = router;