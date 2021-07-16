
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const { validationName, validationQuantity } = require('./middlewares/products');
const app = express();
const {validationSalesQuantity} =require('./middlewares/sales');


app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('foi');
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products',validationName, validationQuantity, productsController.create);
app.put('/products/:id', validationName, validationQuantity, productsController.change);
app.delete('/products/:id', productsController.del);

app.post('/sales', validationSalesQuantity, salesController.create);
app.get('/sales', salesController.getAll);
app.put('/sales/:id', validationSalesQuantity, salesController.change);
app.get('/sales/:id', salesController.getById);
app.delete('/sales/:id', salesController.del);


const PORT = 3000;

app.listen( process.env.PORT || PORT, () => console.log('O Pai tá ON!!'));

//  Consultei os repoitórios de meus colegas durante a desenvoltura.
//  Arnaelcio : https://github.com/tryber/sd-08-store-manager/pull/67/files
//  Rita de Cássia: 

//  O requisito 9 foi adaptado á partir do commit de Ana-Karine;
//  https://github.com/tryber/sd-08-store-manager/pull/70/commits/cdc5091c6399dda0e20cf3691a4a4391f78a44a8#diff-fc3cfb3eeca928b73865f704a03a17633a56ef92d28746322cdcb7a0653f41b8R2