require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', (req, res) => {
  const {name, quantity} = req.body;
  res.status(200).send({name, quantity});
});


app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
