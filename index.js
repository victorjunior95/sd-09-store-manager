const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;
const create = 201;
const sucess = 200;
const notProduct = 422;

const product = require('./models/product');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', async(req, res) => {
  const { name, quantity } = req.body;
  console.log(product.isValidName(name));
  if(!product.isValidName(name)) {
    console.log(name);
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long',
      }
      });
  }
  if( await product.nameProduct(name)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
      });
  }

  if(!product.isValidQuantitPositivo(quantity)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
      });
  }

  if(!product.isvalidQuantityIsNumber(quantity)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
      });
  } 
  const cadastroProduto = await product.createProduct(name, quantity);
  res.status(create).json(cadastroProduto);
});

app.get('/products', async(req, res) => {
  const products  = await product.getProducts();
  res.status(sucess).json({ products });
});

app.get('/products/:_id', async(req, res) => {
  const { _id } = req.params;
  const findById = await product.productsId(_id);
  if(!findById) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
      });
  }
  res.status(sucess).json(findById);
  
});

app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});

