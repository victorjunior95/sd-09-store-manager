const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;
const create = 201;
const sucess = 200;
const notProduct = 422;

const products = require('./models/products');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async(req, res) => {
  const product = await products.getProducts();
  res.status(sucess).json(product);
});

app.post('/products', async(req, res) => {
  const { name, quantity } = req.body;
  console.log(products.isValidName(name));
  if(!products.isValidName(name)) {
    console.log(name);
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long',
      }
      });
  }
  if( await products.nameProduct(name)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
      });
  }

  if(!products.isValidQuantitPositivo(quantity)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
      });
  }
  
  if(!products.isvalidQuantityIsNumber(quantity)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
      });
  } 
  const cadastroProduto = await products.createProduct(name, quantity);
  console.log(cadastroProduto);
  res.status(create).json(cadastroProduto);
});

app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});

