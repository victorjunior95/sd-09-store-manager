const ProductsModel = require('../model/Products');
const ProductsService = require('../services/productService');
const code = require('../utils/httpCodes');

const add = async (req, res) => {
  try{
    const {name, quantity} = req.body;
    const empty = 0;

    const product = await ProductsService.add(name, quantity);

    if (product.length === empty) {          
      return res.status(code.post_error).json({err: {
        code: 'invalid_data',
        message: 'Product already exists'}
      });    
    }

    return res.status(code.post_success).json(product);
  } catch (err) {
    const wentWrong = 500;
    return res.status(wentWrong).json({err: {
      code: 'invalid_data',
      message: 'Something went wrong'}
    });    
  }
};

const list = async (req, res) => {
  const { id } = req.params;

  const products = await ProductsService.list(id);
  
  if(products){
    return res.status(code.get_success).json(products);
  }
  
  return res.status(code.post_error).json({err: {
    code: 'invalid_data',
    message: 'Wrong id format'}
  });    

};

const update = async (req, res) => {  
  const { id } = req.params;
  const { name, quantity} = req.body;

  const products = await ProductsModel.update(id, name, quantity);
  
  if(products){
    return res.status(code.get_success).json(products);
  }
  
  return res.status(code.post_error).json({err: {
    code: 'invalid_data',
    message: 'Wrong id format'}
  });    

};

const remove = async (req, res) => {  
  const { id } = req.params;  

  const result = await ProductsService.remove(id);
  
  if(result){
    return res.status(code.get_success).json(result);
  }
  
  return res.status(code.post_error).json({err: {
    code: 'invalid_data',
    message: 'Wrong id format'}
  });    

};

module.exports = {
  add,
  list,
  update,
  remove
};
