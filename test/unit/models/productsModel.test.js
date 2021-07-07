const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const { getConnection } = require('../connectionMock');

describe('Insert new product into database', () => {
  const payloadProduct = {
    name: "led rgb",
    quantity: 10,
  }

  let connectionMock;

  before(async () => {
    connectionMock = await getConnection;
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  })

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
