const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();

const getConnection = async () => DBServer.getUri()
  .then((URLMock) => MongoClient.connect(URLMock, {
  useNewUrlParser: true, useUnifiedTopology: true }));

module.exports = getConnection;
