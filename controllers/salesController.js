const SalesModel = require('../model/Sales');
const SalesService = require('../services/saleService');
const code = require('../utils/httpCodes');

const add = async (req, res) => {
  const values = req.body;
  const empty = 0;

  const sale = await SalesService.add(values);

  return res.status(code.get_success).json(sale);
};

const list = async (req, res) => {
  const { id } = req.params;

  const products = await SalesService.list(id);
  
  if(products){
    return res.status(code.get_success).json(products);
  }
  
  return res.status(code.not_found).json({err: {
    code: 'not_found',
    message: 'Sale not found'}
  });    
};

const update = async (req, res) => {  
  const { id } = req.params;
  const values = req.body;

  const sale = await SalesModel.update(id, values);
  
  if(sale){
    return res.status(code.get_success).json(sale);
  }
  
  return res.status(code.post_error).json({err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'}
  });    

};

const remove = async (req, res) => {  
  const { id } = req.params;  

  const result = await SalesModel.remove(id);
  
  if(result){
    return res.status(code.get_success).json(result);
  }
  
  return res.status(code.post_error).json({err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format'}
  });    

};

module.exports = {
  add,
  list,
  update,
  remove
};
