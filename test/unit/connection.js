const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Server = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const connectionUri = () => Server.getUri()
  .then((setURI) => MongoClient.connect(setURI, OPTIONS));

module.exports = connectionUri;