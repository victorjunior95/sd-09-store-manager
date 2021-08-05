const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controller/productController');
const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => { response.send();});
app.get('/products', controller.getAll);
app.post('/products', controller.create);

app.use(error);

const LOCALHOST = 3000;

const port = process.env.PORT || LOCALHOST;

app.listen(port, () => { console.log(`Ouvindo na porta ${port}`);});
