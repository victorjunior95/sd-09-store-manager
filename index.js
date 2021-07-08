const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controllers/Product');

const app = express();
app.use(bodyParser.json());

const localPort = 3000;

const PORT = process.env.PORT || localPort;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Controller.createProduct);

app.get('/products', Controller.getAll);

app.get('/products/:id', Controller.findProductById);

app.put('/products/:id', Controller.editProducts);

app.delete('/products/:id', Controller.removeProduct);

// app.post('/sales', ControllerSales.createSale);

// app.get('/sales', ControllerSales.getAll);

// app.get('/sales/:id', ControllerSales);

// app.put('/sales/:id', ControllerSales.editProducts);

// app.delete('/sales/:id', ControllerSales.removeProduct);


app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
