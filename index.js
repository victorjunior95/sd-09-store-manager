const express = require('express');

const ProductRoutes = require('./Routes/ProductRoutes');
const SalesRoutes = require('./Routes/SalesRoutes');


const app = express();
const port = 3000;

app.use(express.json());


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductRoutes);
app.use('/sales', SalesRoutes);




app.listen(port, () => console.log('Projeto Online na Porta ' + port));
