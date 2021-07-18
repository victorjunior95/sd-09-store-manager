const express = require('express');
const bodyParser = require('body-parser');
const { minLenght, min } = require('./validators');
const { productModel } = require('./models');
const { responseHelperMiddleware } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.get('/', (_request, response) => {
  response.send();
});

app.use(responseHelperMiddleware);

function createProductValidator(req, res, next) {
  const { name, quantity } = req.body;
  const minNameLength = 5;
  if (minLenght(name, minNameLength)) {
    return res.invalidData('"name" length must be at least 5 characters long');
  }
  const minQuantityValue = 1;
  if (min(quantity, minQuantityValue)) {
    return res.invalidData('"quantity" must be larger than or equal to 1');
  }
  if (!Number(quantity)) {
    return res.invalidData('"quantity" must be a number');
  }
  return next();
}

app.post('/products', createProductValidator, async (req, res) => {
  const { name, quantity } = req.body;
  const productWithSameName = await productModel.findByName(name);
  if (productWithSameName) {
    return res.invalidData('Product already exists');
  }
  const createdProduct = await productModel.save({ name, quantity });
  return res.created(createdProduct);
});

app.listen(PORT, () => console.log(process.env));
