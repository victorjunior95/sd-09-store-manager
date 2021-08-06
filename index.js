const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controller/productController');
const sale = require('./controller/salesController');
const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => { response.send();});
app.post('/products', controller.create);
app.get('/products', controller.getAll);
app.get('/products/:id', controller.getById);
app.put('/products/:id', controller.update);
app.delete('/products/:id', controller.destroy);

app.post('/sales', sale.create);
app.get('/sales', sale.getAll);
app.get('/sales/:id', sales.getById);
app.put('/sales/:id', sale.update);
app.delete('/sales/:id', sale.destroy);

app.use(error);

const LOCALHOST = 3000;

const port = process.env.PORT || LOCALHOST;

app.listen(port, () => { console.log(`Ouvindo na porta ${port}`);});
