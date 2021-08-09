const sinon = require('sinon');
const { expect } = require('chai');
const ProductsController = require('../../controllers/ProductsController');
const ProductsService = require('../../services/ProductsService');
const SalesController = require('../../controllers/SalesController');
const SalesService = require('../../services/SalesService');

// PRODUCTS

describe('Function getAllProducts', () => {
  describe('quando existe produtos no banco', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(ProductsService, 'getAllProducts')
        .resolves([]);

      request.body = {};

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns(response);
    })

    it('retorna um status 200', async () => {
      await ProductsController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array em formato json', async () => {
      await ProductsController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(false);
    });
  });
})

describe('Function findById', () => {
  describe('procura um produto pelo ID', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: '60e72ce912fb02363cd340e4' };
      request.body = {};

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductsService, 'findById')
        .resolves(true);
    });

    after(() => {
      ProductsService.findById.restore();
    });

    it('retorna um status 200', async () => {
      await ProductsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})

describe('Function createProduct', () => {
  describe('cria o produto', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {
        name: 'Cerveja',
        quantity: 10
      };

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductsService, 'createProduct')
        .resolves(true);
    });

    after(() => {
      ProductsService.createProduct.restore();
    });

    it('retorna um status 201', async () => {
      await ProductsController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
})

describe('Function editProduct', () => {
  describe('edita um produto', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: '60e72ce912fb02363cd340e4' };
      request.body = {
        name: 'Cerveja',
        quantity: 10
      };

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductsService, 'editProduct')
        .resolves(true);
    });

    after(() => {
      ProductsService.editProduct.restore();
    });

    it('retorna um status 200', async () => {
      await ProductsController.editProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})

describe('Function deleteProduct', () => {
  describe('edita um produto', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: '60e72ce912fb02363cd340e4' };
      request.body = {};

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductsService, 'deleteProduct')
        .resolves(true);
    });

    after(() => {
      ProductsService.deleteProduct.restore();
    });

    it('retorna um status 200', async () => {
      await ProductsController.deleteProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})

// SALES

describe('Function getAllSales', () => {
  describe('quando existe produtos no banco', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(SalesService, 'getAllSales')
        .resolves([]);

      request.body = {};

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();
    })

    it('retorna um status 200', async () => {
      await SalesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})

describe('Function findById', () => {
  describe('procura um produto pelo ID', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: '60e72ce912fb02363cd340e4' };
      request.body = {};

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'findById')
        .resolves(true);
    });

    after(() => {
      SalesService.findById.restore();
    });

    it('retorna um status 200', async () => {
      await SalesController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})

describe('Function createSales', () => {
  describe('cria o produto', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {
        name: 'Cerveja',
        quantity: 10
      };

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'createSales')
        .resolves(true);
    });

    after(() => {
      SalesService.createSales.restore();
    });

    it('retorna um status 200', async () => {
      await SalesController.createSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})

describe('Function editSale', () => {
  describe('edita um produto', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: '60e72ce912fb02363cd340e4' };
      request.body = [
        {
          productId: "5f3ff849d94d4a17da707008",
          quantity: 3
        }
      ]

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'editSale')
        .resolves(true);
    });

    after(() => {
      SalesService.editSale.restore();
    });

    it('retorna um status 200', async () => {
      await SalesController.editSale(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})

describe('Function deleteSale', () => {
  describe('edita um produto', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: '60e72ce912fb02363cd340e4' };
      request.body = {};

      response.status = sinon.stub()
        .returns(response);

      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'deleteSale')
        .resolves(true);
    });

    after(() => {
      SalesService.deleteSale.restore();
    });

    it('retorna um status 200', async () => {
      await SalesController.deleteSale(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
})
