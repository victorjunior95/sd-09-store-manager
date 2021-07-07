const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const {
  alldocs,
  insertpdt,
  deleteone,
  getoneid,
  updateOne,
} = require('../services/productServce');
const cc = 200;
const cci = 201;
const z = 0;
const cdxxii = 422;
const cdiv = 404;
const invid = { err:{ code: 'invalid_data', message: 'Wrong id format' } }; 

router.get('/', async(req, res) => {  
  
  const products = await alldocs();
  res.status(cc).send(products);
 
  
});


router.get('/:id', async(req, res) => {
  const { id } = req.params;
  const result = await getoneid(id);
  
  if (result === null || result.err){
    console.log('testaraqui',result);
    res.status(cdxxii).send(invid);
    return;
  }else {
    res.status(cc).send(result);
    return;
  };
});


router.post('/', async(req, res) => {
  
  const { name, quantity } = req.body;
    
  let result = null;
  result = await insertpdt(name, quantity);
  //console.log('aqui',result);
  if(result === null || result.err){res.status(cdxxii).json(result); return;
  }else if(!result === null || result.ops[z]){
    res.status(cci).json(result.ops[z]); return;
  }
}); 


router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const  body = req.body;
  
  if(ObjectId.isValid(id)){
    const result = await updateOne(id, body);
  
    if(result === null || result.err) {
      res.status(cdxxii).send(result);
      return;
    }else {
      res.status(cc).json(result);
      return;
    // console.log(result);
    };
  }});


router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const result = await  deleteone(id);
  const din = result.err ? cdxxii : cc; 

  res.status(din).send(result); return;
});

module.exports = router;