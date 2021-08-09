const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const getConnection = () => DBServer.getUri()
  .then((URLMock) => MongoClient.connect(URLMock, OPTIONS));

module.exports = getConnection;
