const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', );

app.get('/products/:id', );

app.put('/products', );

app.listen(PORT, () => console.log(`> Server is up and running on PORT : ${PORT}`));
