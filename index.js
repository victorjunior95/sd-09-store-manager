const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;

const product = require('./models/product');
const productControllers = require('./conntrollers/product');
const validations  = require('./midlawwares/validations');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products',
  validations.isValidName,
  validations.existName, 
  validations.isValidQuantitPositivo, 
  validations.isvalidQuantityIsNumber, 
  productControllers.create); 

app.get('/products', productControllers.getAllProduct);

app.get('/products/:_id', validations.isValidId, productControllers.findById );

app.put('/products/:_id', 
  validations.isValidName, 
  validations.isValidQuantitPositivo, 
  validations.isvalidQuantityIsNumber, 
  productControllers.editProduct);

app.delete('/products/:_id', validations.isValidId, productControllers.deleteProduct);

app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});

