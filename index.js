const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => { response.send();});
app.get('/products', ProductController.findAll);
app.get('/products/:id', ProductController.findById);

app.post('/products', ProductController.create);
app.put('/products/:id', ProductController.update);

app.listen(port, () => console.log(`Example app listening on ${port}!`));