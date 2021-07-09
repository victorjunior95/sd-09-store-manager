const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const ProductModel = require('../../models/productModel');
const SalesModel = require('../../models/salesModel');

const DBServer = new MongoMemoryServer();
let connectionMock;

const PRODUCT_ID_EXAMPLE = '60e84f0ea4f80445892aa774';
const payloadProduct = {
  name: 'Produto 1',
  quantity: 10
};

const SALE_ID_EXAMPLE = '60e78cd1137bfe9359c55d09';
const payloadSale = [
  {
    productId: PRODUCT_ID_EXAMPLE,
    quantity: 5
  }
];

before(async () => {
  const URLMock = await DBServer.getUri();
  connectionMock = await MongoClient.connect(URLMock,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  sinon.stub(MongoClient, 'connect')
    .resolves(connectionMock);
});

after(async () => {
  await connectionMock.close();
  MongoClient.connect.restore();
  await DBServer.stop();
});

describe('Add a new product in the DB', () => {
  describe('When is successfully added', async () => {
    it('returns a object', async () => {
      const response = await ProductModel.create(payloadProduct);

      console.log(response);

      expect(response).to.be.an('object');
    });

    it('the object has an "_id" key', async () => {
      const response = await ProductModel.create(payloadProduct);

      console.log(response);

      expect(response).to.have.a.property('_id');
    });
  });
});
