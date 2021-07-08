const express = require('express');
const bodyParser = require('body-parser');
// const Joi = require('joi');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');


// const minNameLength = 5;

// const schema = Joi.object({
//   name: Joi.string().min(minNameLength),
// });


const app = express();
app.use(bodyParser.json());

const PORT = '3000';


app.post('/products', productController.create);

app.put('/products/:id', productController.updateById);

app.get('/products/:id', productController.getById);

app.get('/products', productController.getAll);

app.delete('/products/:id', productController.deleteById);


app.post('/sales', salesController.create);

app.get('/sales/:id', salesController.getById);

app.get('/sales', salesController.getAll);

app.put('/sales/:id', salesController.updateById);

app.delete('/sales/:id', salesController.deleteById);



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online');
});
