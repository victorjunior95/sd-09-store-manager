const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

describe('Create an endpoint for product registration', () => {
  describe('Failed to register', () => {
    const { name, quantity } = { name: "Prod", quantity: 10 };

    before(() => sinon.stub(productsModel, 'createProduct').resolves(null));
    after(() => productsModel.createProduct.restore());

    it('Returns an object', async () => {
      const res = await productsService.create(name, quantity);
      expect(res).to.be.an('object');
    });

    it('Returns an error object with curly braces: err, code and message', async () => {
      const res = await productsService.create(name, quantity);
      expect(res).to.exist;
      expect(res).to.be.an('object').to.have.key('err');
      expect(res.err).to.be.an('object').to.have.all.keys('code', 'message');
    });
  });

  describe('Success when registering', () => {
    const obj = { name: 'Product1', quantity: 100, _id: '60f920317d5d542c8129aa59' };
    before(() => sinon.stub(productsModel, 'createProduct').resolves(obj));
    after(() => productsModel.createProduct.restore());

    it('Return an object containing: _id, name, quantity', async () => {
      const res = await productsService.create(obj.name, obj.quantity);
      expect(res).to.be.an('object').to.have.all.keys('_id', 'name', 'quantity');
    });
  });
});

describe('Create an endpoint to list products', () => {
  describe('There are no registered products', () => {
    const obj = { status: 200, result: { products: [] } };

    before(async () => sinon.stub(productsModel, 'getAllProducts').resolves(obj));
    after(async () => productsModel.getAllProducts.restore());

    it('Returns an object', async () => {
      const res = await productsService.allProducts();
      expect(res).to.be.an('object');
    });

    it('The array is empty', async () => {
      const res = await productsService.allProducts();
      expect(res.result.products).to.empty;
    });
  });

  describe('List all products successfully', () => {
    const obj = { 'products': [
      { name: 'Product1', quantity: 100, _id: '60f920317d5d542c8129aa59' },
      { name: 'Product2', quantity: 50, _id: '60f92c8966315e5c551a33dd' },
    ] };

    before(() => sinon.stub(productsModel, 'getAllProducts').resolves(obj));
    after(() => productsModel.getAllProducts.restore());

    it('Return an object with key products', async () => {
      const res = await productsService.allProducts();
      expect(res).to.be.an('object').to.have.key('products');
      expect(res.products).to.be.an('array');
    });

    it('Contains an array with all registered products', async () => {
      const res = await productsService.allProducts();
      expect(res.products).to.be.an('array').to.have.length(2);
      expect(res.products[0]).to.be.an('object');
    });
  });

  describe('Search products by Id', () => {
    describe('Search unsuccessful', () => {
      const id = '60f920317d5d542c8129aa59';
      before(() => sinon.stub(productsModel, 'getByIdProduct').resolves(null));
      after(() => productsModel.getByIdProduct.restore());

      it('Return an error-type object with the keys: err, code and message', async () => {
        const res = await productsService.getById(id);
        expect(res).to.exist;
        expect(res).to.be.an('object').to.have.key('err');
        expect(res.err).to.be.an('object').to.have.all.keys('code', 'message');
      });
    });

    describe('Return search successfully', () => {
      const obj = { name: 'Product1', quantity: 100, _id: '60f920317d5d542c8129aa59' };

      before(() => sinon.stub(productsModel, 'getByIdProduct').resolves(obj));
      after(() => productsModel.getByIdProduct.restore());

      it('Returns an object with the keys: _id, name, quantity', async () => {
        const res = await productsService.getById(obj._id);
        expect(res).to.exist;
        expect(res).to.be.an('object').to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('Create an endpoint to update a product', () => {
    describe('Update successful', () => {
      const obj = { name: 'Product1', quantity: 200, _id: '60f920317d5d542c8129aa59' };

      before(() => sinon.stub(productsModel, 'updateProduct').resolves({}));
      after(() => productsModel.updateProduct.restore());

      it('Returns an object', async () => {
      const res = await productsService.updateService(obj._id, obj.name, obj.quantity);
      expect(res).to.be.an('object');
      });
    });

    describe('Unsuccessful update', () => {
      const obj = { name: 'Prod', quantity: 200, _id: '60f920317d5d542c8129aa59' };
      const error = { err:
        { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
      };
      before(() => sinon.stub(productsModel, 'updateProduct').resolves({}));
      after(() => productsModel.updateProduct.restore());

      it('Return an error-type object with the key: err', async () => {
        const res = await productsService.updateService(obj._id, obj.name, obj.quantity);
        // expect(res).to.exist;
        expect(res.status).to.equal(422);
        // expect(res).to.equal(error);
        // expect(res).to.be.an('object').to.have.key('err');
      });
    });
  });
});

describe('Create an endpoint to delete a product', () => {
  describe('Successfully deleted', () => {
    const obj = { _id: '60fa806df53e00f0cf88955c', name: 'Product2', quantity: 50 };

    before(() => sinon.stub(productsModel, 'deleteProduct').resolves(obj));
    after(() => productsModel.deleteProduct.restore());

    it('Return an object with the product deleted', async () => {
      const res = await productsService.deleteService(obj._id);
      expect(res).to.be.an('object');
    });

    it('Return the product deleted', async () => {
      const res = await productsService.deleteService(obj._id);
      expect(res).to.equal({ status: 200, result });
    });

    it('Return the product deleted', async () => {
      const res = await productsService.deleteService(obj._id);
      expect(res).to.have.all.keys('_id', 'name', 'quantity')
    });
  });

  describe('Failed to delete', () => {
    const obj = { status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } };
    const id = '60fa830188b8870332e39a10';
    before(() => sinon.stub(productsModel, 'deleteProduct').resolves(obj));
    after(() => productsModel.deleteProduct.restore());

    it('Returns an error object', async () => {
      const res = await productsService.deleteService(id);

      expect(res).to.exist;
      expect(res).to.be.an('object').to.have.key('err');
      expect(res.err).to.be.an('object').to.have.all.keys('code', 'message');
      expect(res.err.code).to.be.equal('invalid_data');
      expect(res.err.message).to.be.equal('Wrong id format');
    });
  });
});

describe('Validation tests', () => {
  describe('Successful', () => {
    before(() => sinon.stub(productsModel, 'getByIdProduct')
      .resolves({ name: 'Product1', quantity: 100, _id: '60f920317d5d542c8129aa59' }));
    after(() => productsModel.getByIdProduct.restore());

    it('Returns null', async () => {
      const res  = await salesModel.createSales([{
        'productId': '60f920317d5d542c8129aa59',
        'quantity': 10,
      }]);

      expect(res).to.be.an('object').to.be.empty;
    });
  });

  describe('Product not found', () => {
    before(() => sinon.stub(productsModel, 'getByIdProduct').resolves(null));
    after(() => productsModel.getByIdProduct.restore());

    it('Return erro: code e message', async () => {
      const res  = await salesModel.createSales([{ 'productId': '60f920317d5d542c8129aa59', 'quantity': 10 }]);

      expect(res).to.be.an('object').to.have.keys('err')
      expect(res.err).to.be.an('object').to.have.all.keys('code', 'message');
      expect(res.err.code).to.be.equal('invalid_data');
    });
  });

  describe('Insufficient product quantity', () => {
    before(() => sinon.stub(productsModel, 'getByIdProduct')
      .resolves({ name: 'Product1', quantity: 100, _id: '60f920317d5d542c8129aa59' }));

    it('Returns code error', async () => {
      const res  = await salesModel.createSales([{ 'productId': '60f920317d5d542c8129aa59', 'quantity': 300 }]);

      expect(res).to.be.an('object').to.have.keys('err')
      expect(res.err).to.be.an('object').to.have.all.keys('code', 'message');
      expect(res.err.code).to.be.equal('stock_problem');
      expect(res.err.message).to.be.equal('Such amount is not permitted to sell');
    });
  });
});

describe('Create an endpoint to register sales', () => {
  describe('Unsuccessful', () => {
    before(() => {
      sinon.stub(salesModel, 'createSales')
        .resolves({err:{}});
    });
    after(() => {
      salesModel.createSales.restore();
    })
    it('deve retornar um objeto com o erro', async () => {
      const res = await salesService.create([
        { 'productId': '60f920317d5d542c8129aa59', 'quantity': 10 },
      ]);

      expect(res).to.be.an('object');
    });
  });

  describe('Successful', () => {
    const prod = [{ productId: '60e72ce912fb02363cd340e4', quantity: 10 }];
    const sale = { insertedId: '60e72ce912fb02363cd340e4', itensSold: prod };

    before(async () => sinon.stub(salesModel, 'createSales').resolves(sale));
    after(async () => salesModel.createSales.restore());

    it('retorna um object', async () => {
      const res = await salesService.create(prod);
      expect(res).to.be.an('object');
    });
  });

  describe('Successful registration', () => {
    before(() => {
      sinon.stub(salesModel, 'createSales')
        .resolves('60fa86e7562aec249938dc02');
      sinon.stub(salesModel, 'createSales')
        .resolves({});
      sinon.stub(productsModel,'updateProduct')
        .resolves({});
    });
    after(() => {
      salesModel.createSales.restore();
      productsModel.updateProduct.restore();
    });

    it('Returns Id from sale', async () => {
      const res = await salesService.create([
        { 'productId': '60fa86e7562aec249938dc02', 'quantity': 10 },
      ]);
      expect(res).to.be.an('string').to.have.length(24);
    })
  });
});

describe('Create an endpoint to list sales', () => {
  describe('Successful', () => {
    describe('There is no sale', () => {
      it('Returns an array', async () => {
        const response = await salesService.allSales();
        expect(response).to.be.an('array');
      });

      it('Empty array ', async () => {
        const response = await salesService.allSales();
        expect(response).to.be.empty;
      });
    });

    const sales = { sales: [
      { 'productId': '60f920317d5d542c8129aa59', 'quantity': 200 },
      { 'productId': '60f92c8966315e5c551a33dd', 'quantity': 150 }
    ]};

    before(() => sinon.stub(salesModel, 'getAllSales').resolves(sales));
    after(() => salesModel.getAllSales.restore());

    it('Returns an object: key sales', async () => {
      const res = await salesService.allSales();
      expect(res).to.be.an('object').to.have.key('sales');
    });
  });

  describe('Search by id', () => {

    describe('Successful', async () => {
      const obj = {
        _id: '60f920317d5d542c8129aa59',
        itensSold: [{ 'productId': '60f920317d5d542c8129aa59', 'quantity': 10 }],
      }
      before(() => sinon.stub(salesModel, 'getByIdSale').resolves(obj));
      after(() => salesModel.getByIdSale.restore());

      it('Returns an object: keys "_id" e "itensSold"', async () => {
        const res = await salesService.getById('60f920317d5d542c8129aa59');
        expect(res).to.be.an('object').to.have.all.keys('_id', 'itensSold');
      });
    });

    describe('Returns an object successful', () => {
      const prod = [{ productId: '60e72ce912fb02363cd340e4', quantity: 10 }];
      const sale = { insertedId: '60e72ce912fb02363cd340e5', itensSold: prod };
      const id = '60e72ce912fb02363cd340e4';

      before(async () => sinon.stub(salesModel, 'getByIdSale').resolves(sale));
      after(async () => salesModel.getByIdSale.restore());

      it('Returns an object', async () => {
        const res = await salesService.getById(id);
        expect(res).to.be.an('object');
      });
    });

    describe('Unsuccess', async () => {
      const id = '60f920317d5d542c8129aa59';
      before(() => sinon.stub(salesModel, 'getByIdSale').resolves(null));
      afterEach(() => salesModel.getByIdSale.restore());

      it('Return an object error', async () => {
        const res = await salesService.getById(id);
        expect(res).to.be.an('object').to.have.keys('err');
      });
    });

    describe('ID not found', () => {
      const sale = { err: { code: 'not_found', message: 'Sale not found' } };
      const id = '60e72ce912fb02363cd340e4';

      before(async () => sinon.stub(salesModel, 'getByIdSale').resolves(sale));
      after(async () => salesModel.getByIdSale.restore());

      it('Returns an object error', async () => {
        const res = await salesService.getById(id);
        expect(res).to.be.an('object');
      });
    });
  });
});

describe('Create an endpoint to update a sale', () => {
  describe('Successful update', () => {
    const upd = [{ productId: '60f920317d5d542c8129aa59', quantity: 10 }];
    before(() => sinon.stub(salesModel, 'updateSale').resolves(1));
    after(() => salesModel.updateSale.restore());

    it('Receive 1 response', async () => {
      const res = await salesService.updateService(upd.productId, upd.quantity);
      expect(res).to.be.equal(1);
    });

    describe('Returns an object successful update', () => {
      const prod = [{ productId: '60e72ce912fb02363cd340e4', quantity: 10 }];
      const sale = { insertedId: '60e72ce912fb02363cd340e4', itensSold: prod };
      const id = '60e72ce912fb02363cd340e4';

      before(async () => sinon.stub(salesModel, 'updateSale').resolves(sale));
      after(async () => salesModel.updateSale.restore());

      it('Returns an object', async () => {
        const res = await salesService.updateService(id, prod);
        expect(res).to.be.an('object');
      })
    });
  });

  describe('Unsuccessful update', () => {
    describe('Fail update sale', () => {
      const upd = [{ productId: '60f920317d5d542c8129aa59', quantity: 10 }];
      before(() => sinon.stub(salesModel, 'updateSale').resolves(null));
      after(() => salesModel.updateSale.restore());

      it('Returns null', async () => {
        const res = await salesService.updateService(upd.productId, upd.quantity);
        expect(res).to.be.null;
      });
    });

    describe('There is no change', () => {
      const upd = [{ productId: '60f920317d5d542c8129aa59', quantity: 10 }];
      before(() => sinon.stub(salesModel, 'updateSale').resolves(0));
      after(() => salesModel.updateSale.restore());

      it('Returns null', async () => {
        const res = await salesService.updateService(upd.productId, upd.quantity);
        expect(res).to.be.equal(0);
      });
    });
  });
});

describe('Create an endpoint to delete a sale', () => {
  describe('Successful deletion ', () => {
    const obj = {
      _id: '60f920317d5d542c8129aa59',
      itensSold: [{ 'productId': '60f920317d5d542c8129aa59', 'quantity': 10 }],
    }

    before(() => {
      sinon.stub(salesModel, 'deleteSale').resolves(obj);
      sinon.stub(salesModel, 'deleteSale').resolves({});
    });
    after(() => { salesModel.deleteSale.restore() });

    it('Returns an object', async () => {
      const res = await salesService.deleteService();
      expect(res).to.be.an('object');
    });
  });

describe('Delete sale', () => {
  const prod = [{ productId: '60e72ce912fb02363cd340e4', quantity: 10 }];
  const sale = { insertedId: '60e72ce912fb02363cd340e5', itensSold: prod };
  const id = '60e72ce912fb02363cd340e5';

  before(async () => sinon.stub(salesModel, 'updateSale').resolves(sale));
  after(async () => salesModel.updateSale.restore());

  it('Return an object', async () => {
    const res = await salesService.deleteSale(id);
    expect(res).to.equal(sale);
  });
});

  describe('Unsuccessful', () => {
    before(() => sinon.stub(salesModel, 'deleteSale').resolves(null));
    after(() => { salesModel.deleteSale.restore() });

    it('Returns object error', async () => {
      const res = await salesService.deleteService();
      expect(res).to.be.an('object').to.have.key('err');
      expect(res.err).to.be.an('object').to.have.all.keys('code','message');
      expect(res.err.code).to.be.equal('invalid_data');
      expect(res.err.message).to.be.equal('Wrong sale ID format');
    });
  });
});
