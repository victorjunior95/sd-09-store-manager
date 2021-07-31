const express = require('express');

const app = express();

const { productRoute } = require('../routes');

app.use(express.json());
app.use('/products', productRoute);


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


const PORT = 3000;

app.listen(PORT, ()=> console.log(`On lin in port ${PORT}`));