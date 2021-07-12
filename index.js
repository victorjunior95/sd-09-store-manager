const express = require('express');
const bodyparser = require('body-parser').json();
const productsController = require('./controllers/productsController');
const app = express();
app.use(express.json());
app.use(bodyparser);
require('dotenv').config();

app.use('/products', productsController);
// app.get('/products/:id', productsController.findById);
// app.post('/products', productsController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('The server is up on port: ', PORT));
