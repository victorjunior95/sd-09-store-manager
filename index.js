const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const INTERNAL_SERVER_ERROR = 500;

app.get('/', (_request, response) => {
  response.send();
});

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err.err) {
    return res.status(err.status).json({ err: err.err });
  }
  res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
});

app.listen(PORT, () => console.log(`run in port ${PORT}`));
