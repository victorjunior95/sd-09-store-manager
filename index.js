const express = require('express');
const app = express();

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Api run in port ${PORT}`));
