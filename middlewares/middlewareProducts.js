const productsService = require('../services/productsService');
const HTTP_UNPROCESS_CLIENT = 422;

const validaName = (req, res, next) => {
  const lengthName = 5;
  const { name } = req.body;
  if( name.length < lengthName ) return res.status(HTTP_UNPROCESS_CLIENT).json({
    err: { 
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }
  });
  next();
};

const validaProduto = async (req, res, next) => {
  const { name } = req.body;

  const product = await productsService.getProduct(name);

  if(product) return res.status(HTTP_UNPROCESS_CLIENT).json({
    err: { 
      code: 'invalid_data',
      message: 'Product already exists',
    }
  });
  next();
};

const validaQuantidade = (req, res, next) => {
  const { quantity } = req.body;
  const minQuantity = 1;

  if(Number(quantity) < minQuantity) return res.status(HTTP_UNPROCESS_CLIENT).json({
    err: { 
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    }
  });

  if(typeof quantity != 'number') return res.status(HTTP_UNPROCESS_CLIENT).json({
    err: { 
      code: 'invalid_data',
      message: '"quantity" must be a number',
    }
  });

  next();

};

module.exports = {
  validaName,
  validaProduto,
  validaQuantidade,
};
