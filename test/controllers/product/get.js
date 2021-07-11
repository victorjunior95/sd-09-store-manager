const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { productsController } = require('../../../controllers');
const { productsService } = require('../../../services');
const { InvalidArgumentError } = require('../../../errors');

const sandbox = sinon.createSandbox();

module.exports = () => {
  describe('List a product by its ID (controller)', () => {
    const product = { _id: 'sdf9s7f9s89d7f8s', name: 'candy', quantity: 8000 };
    const expectedResponse = {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
    const expectedError = new InvalidArgumentError('Wrong id format');
    const response = {};
    const request = {};
    let next;

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    describe('when a valid id is provided', () => {
      before(() => {
        request.params = { id: product._id };
        next = sandbox.stub().callsFake(() => {});

        sandbox.stub(productsService, 'get')
          .resolves(product);
      });

      after(() => {
        sandbox.restore();
      });

      it('should never cal  the funciton next', async () => {
        await productsController.get(request, response, next);

        expect(next.neverCalledWith()).to.be.equal(true);
      });

      it('should return a status code 200', async () => {
        await productsController.get(request, response, next);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('should return the product with the respective id', async () => {
        await productsController.get(request, response, next);

        expect(response.json.calledWith(product)).to.be.equal(true);
      });
    });

    describe('when an invalid id is provided', () => {
      before(() => {
        request.params = { id: 'abcdefg' };
        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'get')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.get(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.get(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.get(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });
  });
};
