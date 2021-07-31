const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../services/Products');
const ProductsController = require('../../controllers/Products');
const SalesService = require('../../services/Sales');
const SalesController = require('../../controllers/Sales');

describe('Testing products controllers', () => {
  describe('Creating a product', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'product_test',
        quantity: 10
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(ProductsService, 'createProduct')
        .resolves({
          result: {
            _id: '60e7331efa30b90f51fe8242',
            name: 'product_test',
            quantity: 10
          },
          code: 201,
        });
    });

    after(() => {
      ProductsService.createProduct.restore();
    })

    it('The status with code 201 is called', async () => {
      await ProductsController.createProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
  describe('Listing all products', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(ProductsService, 'getAllProducts')
        .resolves({
          result: {
            products: [
              {
                _id: '60e7331efa30b90f51fe8242',
                name: 'product 01',
                quantity: 10
              },
              {
                _id: '60e7331efa30b90f51fe8243',
                name: 'product 02',
                quantity: 20
              },  
            ],
          },
          code: 200,
        });
    });

    after(() => {
      ProductsService.getAllProducts.restore();
    })

    it('the status with code 200 is called', async () => {
      await ProductsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Listing products by ID', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: '60e7331efa30b90f51fe8242' }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(ProductsService, 'getProductById')
        .resolves({
          result: {
            _id: '60e7331efa30b90f51fe8242',
            name: 'product 01',
            quantity: 10
          },
          code: 200,
        });
    });

    after(() => {
      ProductsService.getProductById.restore();
    })

    it('the status with code 200 is called', async () => {
      await ProductsController.getProductById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('eleting a product', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: '60e7331efa30b90f51fe8242' }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(ProductsService, 'editProduct')
        .resolves({
          result: {
            _id: '60e7331efa30b90f51fe8242',
            name: 'product 01',
            quantity: 20
          },
          code: 200,
        });
    });

    after(() => {
      ProductsService.editProduct.restore();
    })

    it('the status with code 200 is called', async () => {
      await ProductsController.editProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Deleting a product', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: '60e7331efa30b90f51fe8242' }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(ProductsService, 'deleteProduct')
        .resolves({
          result: {
            _id: '60e7331efa30b90f51fe8242',
            name: 'product 01',
            quantity: 20
          },
          code: 200,
        });
    });

    after(() => {
      ProductsService.deleteProduct.restore();
    })

    it('the status with code 200 is called', async () => {
      await ProductsController.deleteProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Testing sales controllers', () => {
  describe('Creating a sale', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        productId: '60e7331efa30b90f51fe8242',
        quantity: 10
      },
      

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(SalesService, 'createSale')
        .resolves({
          result: {
            _id: '5f43ba333200020b101fe4a0',
            itensSold: [
              {
                'productId': '5f43ba273200020b101fe49f',
                'quantity': 2
              }
            ],
          },
          code: 201,
        });
    });

    after(() => {
      SalesService.createSale.restore();
    })

    it('The status with code 201 is called', async () => {
      await SalesController.createSale(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
  describe('Listing all sales', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(SalesService, 'getAllSales')
        .resolves({
          result: {
            sales: [
              {
                _id: '60e7331efa30b90f51fe8242',
                name: 'product 01',
                quantity: 10
              },
              {
                _id: '60e7331efa30b90f51fe8243',
                name: 'product 02',
                quantity: 20
              },  
            ],
          },
          code: 200,
        });
    });

    after(() => {
      SalesService.getAllSales.restore();
    })

    it('the status with code 200 is called', async () => {
      await SalesController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Listing sales by ID', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        productId: '60e7331efa30b90f51fe8242',
        quantity: 10
      },
      request.params = { id: '60e7331efa30b90f51fe8242' }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(SalesService, 'getSaleById')
        .resolves({
          result: {
            _id: '5f43ba333200020b101fe4a0',
            itensSold: [
              {
                'productId': '5f43ba273200020b101fe49f',
                'quantity': 2
              }
            ],
          },
          code: 200,
        });
    });

    after(() => {
      SalesService.getSaleById.restore();
    })

    it('the status with code 200 is called', async () => {
      await SalesController.getSaleById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Edinting a sale', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: '60e7331efa30b90f51fe8242' }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(SalesService, 'editSale')
        .resolves({
          result: {
            _id: '60e7331efa30b90f51fe8242',
            name: 'product 01',
            quantity: 20
          },
          code: 200,
        });
    });

    after(() => {
      SalesService.editSale.restore();
    })

    it('the status with code 200 is called', async () => {
      await SalesController.editSale(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Deleting a product', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: '60e7331efa30b90f51fe8242' }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(SalesService, 'deleteSale')
        .resolves({
          result: {
            _id: '60e7331efa30b90f51fe8242',
            name: 'product 01',
            quantity: 20
          },
          code: 200,
        });
    });

    after(() => {
      SalesService.deleteSale.restore();
    })

    it('the status with code 200 is called', async () => {
      await SalesController.deleteSale(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})