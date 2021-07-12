const sinon = require('sinon');
const { expect } = require('chai');
const { describe, before, after } = require('mocha');
const { salesController } = require('../../../controllers');
const { salesService } = require('../../../services');
const { InvalidArgumentError } = require('../../../errors');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

const sandbox = sinon.createSandbox();
const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'sales';
let connectionMock;

module.exports = () => {
  describe('Create a new sale (controller)', () => {
    const response = {};
    const request = {};
    let next;

    before(async () => {
      connectionMock = await connect();

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {

      MongoClient.connect.restore();
    });

    describe('when a invalid payload is provided', () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
      const expectedError = new InvalidArgumentError('Wrong product ID or invalid quantity')

      before(() => {
        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
          ? response.status(422).json(expectedResponse)
          : null;
        });

        sandbox.stub(salesService, 'create')
        .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      describe('when a negative quantity is provided', () => {
        before(() => {
          request.body = [
            { productId: '60ebeffd4806670c7c6414b9', quantity: -2 },
            { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
          ];
        });

        it('should call the function next', async () => {
          await salesController.create(request, response, next);

          expect(next.calledWith(expectedError)).to.be.equal(true);
        });

        it('should return a status code 422', async () => {
          await salesController.create(request, response, next);

          expect(response.status.calledWith(422)).to.be.equal(true);
        });

        it('should return an object with the following properties', async () => {
          await salesController.create(request, response, next);

          expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
        });
      });

      describe('when a quantity equal to zero is provided', () => {
        before(() => {
          request.body = [
            { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
            { productId: '60ebf0104806670c7c6414ba', quantity: 0 },
          ];
        });

        it('should call the function next', async () => {
          await salesController.create(request, response, next);

          expect(next.calledWith(expectedError)).to.be.equal(true);
        });

        it('should return a status code 422', async () => {
          await salesController.create(request, response, next);

          expect(response.status.calledWith(422)).to.be.equal(true);
        });

        it('should return an object with the following properties', async () => {
          await salesController.create(request, response, next);

          expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
        });
      });

      describe('when a string is provided as quantity', () => {
        before(() => {
          request.body = [
            { productId: '60ebeffd4806670c7c6414b9', quantity: 'string' },
            { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
          ];
        });

        it('should call the function next', async () => {
          await salesController.create(request, response, next);

          expect(next.calledWith(expectedError)).to.be.equal(true);
        });

        it('should return a status code 422', async () => {
          await salesController.create(request, response, next);

          expect(response.status.calledWith(422)).to.be.equal(true);
        });

        it('should return an object with the following properties', async () => {
          await salesController.create(request, response, next);

          expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
        });
      });
    });

    describe('when a valid payload is provided', () => {
      const expectedResponse = {
        _id: 'sdf87sf76sd5s7sdf8',
        itensSold: [
          { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
          { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
        ],
      };

      before(() => {
        request.body = [
          { productId: '60ebeffd4806670c7c6414b9', quantity: -2 },
          { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
        ];
        next = sandbox.stub().callsFake(() =>{});

        sandbox.stub(salesService, 'create')
          .resolves(expectedResponse);
      });

      afterEach(async () => {
        await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});
      });

      after(() => {
        sandbox.restore();
      });

      it('should never call the function next', async () => {
        await salesController.create(request, response, next);

        expect(next.neverCalledWith()).to.be.equal(true);
      });

      it('should return a status code 200', async () => {
        await salesController.create(request, response, next);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await salesController.create(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });
  });
};
