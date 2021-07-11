const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { Product } = require('../../../models');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';

module.exports = () => {
  describe('Update a product (model)', async () => {
    const product = new Product();
    const payload = { name: 'candy', quantity: 8000 };
    let connectionMock;

    before(async () => {
      connectionMock = await connect();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    afterEach(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});
    });

    after(() => {
      MongoClient.connect.restore();
    });

    describe('when a successful update occurs', () => {
      it('should call the function update', () => {
        expect(product.update).to.be.a('function');
      });

      it('should return an object', async () => {
        const { _id: id } = await product.create(payload);
        const response = await product.update({ id, quantity: 42 });

        expect(response).to.be.an('object');
      });

      it('the object must containd the keys _id, name and quantity', async () => {
        const { _id: id } = await product.create(payload);
        const response = await product.update({ id, quantity: 42 });

        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      })
    });

    describe('when an update failed', () => {
      describe('when an invalid id is provided', () => {
        it('should return null', async () => {
          const response = await product.update({ id: 'abc' });

          expect(response).to.be.equal(null);
        });
      });

      describe('when an id that don\'t exist is provided', () => {
        it('should return an object', async () => {
          const response = await product.update({ id: '60e8a400c7520a3aa88a8789', quantity:  42});

          expect(response).to.be.an('object');
        });

        it('should return an empty object', async () => {
          const response = await product.update({ id: '60e8a400c7520a3aa88a8789', quantity: 42 });

          console.log(response);

          expect(response).to.not.have.any.keys('_id', 'name', 'quantity');
        });
      });
    });
  });
};
