const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('../connectionMock');
const ProductsModel = require('../../../models/producstModel');
const connection = require('../../../models/connection');

const payloadProduct = {
  name: "led rgb",
  quantity: 10,
}

let connectionMock;
describe('Insert new product into database', () => {

  // const response = {};

  describe('When it is successfully inserted', () => {

    beforeEach(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    afterEach(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.close();
      MongoClient.connect.restore();
    })

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
