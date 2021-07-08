const app = require('express')();
const bodyParser = require('body-parser').json();

const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', );

app.listen(PORT, () => console.log(`O pai tá on na porta: ${PORT}`));
