const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();

module.exports = async () => {
  const urlMock = await DBServer.getUri();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return MongoClient.connect(urlMock, OPTIONS);
}
