const sinon = require('sinon');
const { expect } = require('chai');
const { describe, before, after } = require('mocha');
const { salesController } = require('../../../controllers');
const { salesService } = require('../../../services');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

const sandbox = sinon.createSandbox();
const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'sales';
let connectionMock;

module.exports = () => {
  describe('List all registered sales (controller)', () => {
    const sales = [
      {
        _id: '0s9d8f7asf98asd9fasf',
        itensSold: [
          { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
          { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
        ],
      },
    ];
    const response = {};
    const request = {};
    let next;

    before(async () => {
      connectionMock = await connect();

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    describe('when a valid payload is provided', () => {
      before(() => {
        next = sandbox.stub().callsFake(() =>{});

        sandbox.stub(salesService, 'getAll')
          .resolves({ sales });
      });

      after(() => {
        sandbox.restore();
      });

      it('should never call the function next', async () => {
        await salesController.getAll(request, response, next);

        expect(next.neverCalledWith()).to.be.equal(true);
      });

      it('should return a status code 200', async () => {
        await salesController.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await salesController.getAll(request, response, next);

        expect(response.json.calledWith({ sales })).to.be.equal(true);
      });
    });
  });
};
