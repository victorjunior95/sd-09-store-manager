const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

/* =======> VARIÁVEIS UTILIZADAS <======= */
const _id = '60feb248b97df9e177dc049e';

const getProd = { status: 200, result: { products: [{
  _id: '60feb248b97df9e177dc049e', name: "Produto1", quantity: 50
}] } };

const prod1 = { name: "Produto1", quantity: 50 };

const getProdEmpty = { status: 200, result: { products: [] } };

const sale = { sales: [{ _id: "60fe8d8ef4498a83242e0da2", itensSold: [{
  productId: '60feb248b97df9e177dc049e', quantity: 5,
}] }] };

const updSale = [{ productId: "60fe8d8ef4498a83242e0da2", quantity: 3 }];

const errId = { status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } };

const errName = { err: { code: "invalid_data",
  message: "\"name\" length must be at least 5 characters long" }, status: 422 };

const errQuantSale = { status: 422, err: {
  code: "invalid_data",  message: "Wrong product ID or invalid quantity" } };

describe('Products Collection', () => {
    /* ==============> CADASTRAR PRODUTOS <============== */
  describe('Create an endpoint for product registration', () => {
    describe('Success when registering', () => {
      before(() => sinon.stub(productsModel, 'createProduct').resolves(getProd.result.products[0]));
      after(() => productsModel.createProduct.restore());

      it('Returns status 201 and ids: _id, name, quantity', async () => {
        const res = await productsService.create(prod1.name, prod1.quantity);
        expect(res.result).to.be.a('object').to.be.all.key('_id', 'name', 'quantity');
        expect(res.status).to.be.equal(201);
      });
    });

    describe('Failed to register', () => {
      it('Returns an error', async () => {
        try { await productsService.create("Prod", prod1.quantity) } catch(err) {
          expect(err).to.have.property('err');
          expect(err).to.have.property('err').to.be.all.keys('code', 'message');
          expect(err).to.have.property('err').to.have.include({
            code: errName.err.code, message: errName.err.message,
          });
          expect(err).to.have.property('status').to.equal(errName.status);
        };
      });
    });
  });
    /* =======> BUSCAR TODOS OS PRODUTOS (Empty) <======= */
  describe('Create an endpoint to list products', () => {
    describe('There are no registered products', () => {
      before(() => sinon.stub(productsModel, 'getAllProducts').resolves(getProdEmpty.result));
      after(() => productsModel.getAllProducts.restore());

      it('Returns an object', async () => {
        const res = await productsService.allProducts();
        expect(res).to.be.an('object');
        expect(res.result).to.have.key('products');
        expect(res.result.products).to.be.an('array');
        expect(res.status).to.be.equal(200);
      });
    });

    describe('List all products successfully', () => {
      before(() => sinon.stub(productsModel, 'getAllProducts')
        .resolves(getProd.result));
      after(() => productsModel.getAllProducts.restore());

      it('Returns an object with key product', async () => {
        const res = await productsService.allProducts();
        expect(res.result).to.be.a('object').to.have.key('products');
        expect(res.result.products).to.be.an('array');
        expect(res.result.products).to.be.an('array').to.have.length(1);
        expect(res.result.products[0]).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.result.products).to.be.an('array').to.have.length(1);
        expect(res.result.products[0]).to.be.an('object');
      });

      it('Return status 200', async () => {
        const res = await productsService.allProducts();
        expect(res.status).to.equal(200);
      });
    });

    describe('Search products by Id', () => {
      before(() => sinon.stub(productsModel, 'getByIdProduct')
        .resolves(getProd.result.products[0]));
      after(() => productsModel.getByIdProduct.restore());

      it('Returns an status: 200 and object with the keys: _id, name, quantity',
        async () => {
          const res = await productsService.getById(_id);
          expect(res).to.exist;
          expect(res.result).to.be.an('object').to.have.all.keys('_id', 'name', 'quantity');
          expect(res.status).to.equal(200);
        },
      );
    });
  });
  /* ==============> ATUALIZAR PRODUTOS <============== */
  describe('Create an endpoint to update a product', () => {
    describe('Update successful', () => {
      before(() => sinon.stub(productsModel, 'updateProduct').resolves(getProd.result.products));
      after(() => productsModel.updateProduct.restore());

      it('return update successfully', async () => {
        const res = await productsService.updateService(_id, 'Produto1', 35);
        expect(res.result).to.be.an('object');
        expect(res.result).to.be.all.keys('_id', 'name', 'quantity');
        expect(res.status).to.equal(200);
      });
    });
  });
  /* ===============> APAGAR PRODUTOS <================ */
  describe('Create an endpoint to delete a product', () => {
    describe('Successfully deleted', () => {
      before(() => {
        sinon.stub(productsModel, 'getByIdProduct').resolves(getProd.result.products[0]);
        sinon.stub(productsModel, 'deleteProduct').resolves(getProd.result.products[0]);
      });
      after(() => {
        productsModel.getByIdProduct.restore();
        productsModel.deleteProduct.restore();
      });

      it('Return an object with the product deleted', async () => {
        const res = await productsService.deleteService('60feb248b97df9e177dc049e');
        expect(res.result).to.be.an('object');
        expect(res).to.have.include({ status: 200 });
        expect(res.result).to.have.all.keys('_id', 'name', 'quantity');
      });
    });

    describe('Failed to delete', () => {
      it('Returns an error object', async () => {
        try { await productsService.deleteService('9999') }
          catch(err) {
            expect(err).to.exist;
            expect(err).to.be.an('object').to.have.key('err', 'status');
            expect(err).to.have.property('err').to.be.all.keys('code', 'message');
            expect(err.err.code).to.equal('invalid_data');
            expect(err.err.message).to.be.equal('Wrong id format');
            expect(err).to.have.property('err').to.have
              .include({ code: errId.err.code, message: errId.err.message });
          };
      });
    });
  });
  /*====================================================*/
});

describe('Sales Collection', () => {
  /* ===============> CADASTRAR VENDAS <=============== */
  describe('Create an endpoint to register sales', () => {
    describe('Unsuccessful', () => {

      it('Returns an error', async () => {
        try { await salesService.create([{ productId: _id, quantity: -10 }]) } catch(err) {
          expect(err).to.have.property('err');
          expect(err).to.have.property('err').to.be.all.keys('code', 'message');
          expect(err).to.have.property('err').to.have.include({
            code: errQuantSale.err.code, message: errQuantSale.err.message,
          });
          expect(err).to.have.property('status').to.equal(errQuantSale.status);
        };
      });
    });

    describe('Successful', () => {
      before(() => {
        sinon.stub(salesModel, 'createSales').resolves(sale.sales[0]);
      });
      after(() => salesModel.createSales.restore());

      it('returns the sale successfully', async () => {
        const res  = await salesService.create(sale.sales[0].itensSold);
        expect(res.result).to.be.an('object');
        expect(res.result).to.be.all.keys('_id', 'itensSold');
        expect(res.status).to.be.equal(200);
      });
    });
  });
  /* ============> BUSCAR TODAS AS VENDAS <============ */
  describe('Create an endpoint to list sales', () => {
    describe('Search all sales', () => {
      describe('When there is no sale', () => {
        before(() => sinon.stub(salesModel, 'getAllSales').resolves({ sales: [] }));
        after(() => salesModel.getAllSales.restore());

        it('Return an object', async () => {
          const res = await salesService.allSales();
          expect(res).to.be.an('object');
          expect(res).to.be.all.keys('result', 'status');
          expect(res.status).to.equal(200);
        });
      });

      describe('When there is at least one sale', () => {
        before(() => sinon.stub(salesModel, 'getAllSales').resolves(sale));
        after(() => salesModel.getAllSales.restore());

        it('Successfully returns a sale', async () => {
          const res = await salesService.allSales();
          expect(res).to.not.be.empty;
          expect(res).to.be.all.keys('result', 'status');
          expect(res.status).to.be.equal(200);
        });
      });
    });
  });
  /* ===============> ATUALIZAR VENDAS <=============== */
  describe('Create an endpoint to update a sale', () => {
    describe('Update successful', () => {
      before(() => {
        sinon.stub(salesModel, 'updateSale').resolves(sale.sales[0]);
      });
      after(() => {
        salesModel.updateSale.restore();
      });

      it('return update successfully', async () => {
        const res = await salesService.updateService(sale.sales[0]._id, updSale);
        expect(res.result).to.be.an('object');
        expect(res.status).to.be.equal(200);
      });
    });

    describe('Unsuccessful update', () => {
      it('Fail update sale', async () => {
        try { await salesService.updateService(sale.sales[0]._id,
          [{ productId: "60fe8d8ef4498a83242e0da2", quantity: -3 }]
        ) } catch(err) {
            expect(err).to.have.property('err');
            expect(err).to.have.property('err').to.be.all.keys('code', 'message');
            expect(err).to.have.property('err').to.have.include({
              code: errQuantSale.err.code, message: errQuantSale.err.message,
            });
            expect(err.err).to.be.an('object');
          };
      });
    });
  });
});
