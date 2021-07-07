const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => { response.send();});
app.post('/products', ProductController.create);

app.listen(port, () => console.log(`Example app listening on ${port}!`));