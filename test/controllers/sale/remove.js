const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { salesService } = require('../../../services');
const { salesController } = require('../../../controllers');
const { InvalidArgumentError, NotFoundError } = require('../../../errors');
const connect = require('../../mocks/connection');

const sandbox = sinon.createSandbox();

module.exports = () => {
  describe('List sale by ID (model)', () => {
    const response = {};
    const request = {};
    let next;

    before(async () => {
      connectionMock = await connect();

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    describe('when a valid id is provided', () => {
      const itensSold = [
        { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
        { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
      ];
      const expectedResponse = { _id: '60ebeffd4806670c7c6414', itensSold };

      before(() => {
        request.params = '60ebeffd4806670c7c6414';

        next = sandbox.stub().callsFake(() => {});

        sandbox.stub(salesService, 'remove')
          .resolves(expectedResponse);
      });

      after(() => {
        sandbox.restore();
      });

      it('should never call the function next', async () => {
        await salesController.remove(request, response, next);

        expect(next.neverCalledWith()).to.be.equal(true);
      });

      it('should return a status code 200', async () => {
        await salesController.remove(request, response, next);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await salesController.remove(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when a valid unregistered id is provided', () => {
      const expectedResponse = {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      };
      const expectedError = new NotFoundError('Sale');

      before(() => {
        request.params = '60ebeffd4806670c7c6414';

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === NotFoundError
            ? response.status(404).json(expectedResponse)
            : null;
        });

        sandbox.stub(salesService, 'remove')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await salesController.remove(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 404', async () => {
        await salesController.remove(request, response, next);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await salesController.remove(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when an invalid id is provided', () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      };
      const expectedError = new InvalidArgumentError('Wrong id format');

      before(() => {
        request.params = 'abcdef';

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(salesService, 'remove')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await salesController.remove(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 404', async () => {
        await salesController.remove(request, response, next);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await salesController.remove(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });
  });
};
