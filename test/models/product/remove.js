const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { Product } = require('../../../models');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

module.exports = () => {
  describe('Remove a product (model)', () => {
    const product = new Product();
    let connectionMock;

    before(async () => {
      connectionMock = await connect();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    describe('when a valid _id is provided', () => {
      it('should return a object', async () => {
        const { _id: id } = await product.create({ name: 'candy', quantity: 8000 });

        const response = await product.remove(id);

        expect(response).to.be.an('object');
      });

      it('should return a object with the keys _id, name and quantity', async () => {
        const { _id: id } = await product.create({ name: 'candy', quantity: 8000 });

        const response = await product.remove(id);

        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      });
    });

    describe('when an invalid _id is provided', () => {
      it('should return null', async () => {
        const { _id: id } = await product.create({ name: 'candy', quantity: 8000 });

        const invalidID = id.toString().replace('0', 'o');
        const response = await product.remove(invalidID);

        expect(response).to.be.equal(null);
      });
    });
  });

};
