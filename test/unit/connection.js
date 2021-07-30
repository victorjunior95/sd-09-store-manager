// referência : https://github.com/tryber/sd-09-store-manager/pull/89 
// separar o código de conexão para não repeti-lo sempre no arquivo de test dos models

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const uriConnection = () => DBServer.getUri()
  .then((setURI) => MongoClient.connect(setURI, OPTIONS));

module.exports = uriConnection;