const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// extrict mode so deu certo assim, sem '/products' não encontrou o endpoint+verbo
app.use('/products', require('./controllers/productControler'));
app.use('/sales', require('./controllers/salesControler'));

const porta = 3000;
app.listen(porta, ()=> {
  console.log('online, escutando a porta: 3000' );
});

module.exports = app;