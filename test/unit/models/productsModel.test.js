const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const ProductsModel = require('../../../models/producstModel');
const connection = require('../../../models/connection');
const { MongoMemoryServer } = require('mongodb-memory-server');

const payloadProduct = {
  name: "led rgb",
  quantity: 10,
}

let connectionMock;

beforeEach(async () => {
  const URLMock = await DBServer.getUri();
  connectionMock = await MongoClient.connect(URLMock,{ useNewUrlParser: true,
    useUnifiedTopology: true });
  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
});

afterEach(async () => {
  await connectionMock.db('StoreManager').collection('products').deleteMany({});
  await DBServer.stop();
  MongoClient.connect.restore();
})

const DBServer = new MongoMemoryServer();

describe('Insert new product into database', () => {

  describe('When it is successfully inserted', () => {

    it('returns an object', async () => {
        const response = await ProductsModel.create(payloadProduct);

        expect(response).to.be.a('object');
    });

    it('The object returned is the object inserted', async () => {
        const response = await ProductsModel.create(payloadProduct);
        expect(response).to.deep.include({name: payloadProduct.name, quantity: payloadProduct.quantity})
    });
  })
})
