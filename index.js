const express = require('express');
const PORT = 3000;
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', require('./routers/products'));

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
