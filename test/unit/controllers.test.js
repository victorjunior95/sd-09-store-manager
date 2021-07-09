const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/productsController');
const productService = require('../../services/registerProductService')

describe('Quando chama o controller createProduct', () => {
  describe('produto não foi inserido', () => {
    const response = {};
    const request = {};
    const next = sinon.stub();

    beforeEach(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productService, 'registerProductService').rejects('object');
    });

    afterEach(() => {
      productService.registerProductService.restore();
    });

    it('Deve chamar o err com status 422', async () => {
      await productController.createProduct(request, response, next);
      
      console.log('---', JSON.stringify(next.firstCall.args[0]), '---');

      expect(next.firstCall.args[0].name).to.equal('object');
    })
  })
})
