
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const errorMiddleware = require('./middlewares/error.js');
const { validationName, validationQuantity } = require('./middlewares/products');
const app = express();

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

// app.get('/books', Book.getAll);
// app.get('/books/author/:id', Book.findByAuthorId);
// app.get('/books/title/:title', Book.findByTitle);
// app.get('/books/:id', Book.findById);
// app.post('/books', Book.create);

app.use(errorMiddleware);

const PORT = 3000;

app.listen( process.env.PORT || PORT, () => console.log('O Pai tá ON!!'));