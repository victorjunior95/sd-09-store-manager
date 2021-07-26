const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

/* =======> VARIÁVEIS UTILIZADAS <======= */
const _id = '60fe9a24c2a6f0ab990f524c';
const getProd = { status: 200, result: { products: [{
  _id, name: "Produto1", quantity: 50
}] } };
const prod1 = { name: "Produto1", quantity: 50 };
const getProdEmpty = { status: 200, result: { products: [] } };
const errId = { status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } };
const errName = { err: { code: "invalid_data",
  message: "\"name\" length must be at least 5 characters long" }, status: 422 };
const errQuantSale = { status: 422, err: {
  code: "invalid_data",  message: "Wrong product ID or invalid quantity" } };

/* =======> BUSCAR TODOS OS PRODUTOS (Empty) <======= */
describe('Create an endpoint to list products', () => {
  describe('There are no registered products', () => {
    before(() => sinon.stub(productsModel, 'getAllProducts').resolves(getProdEmpty));
    after(() => productsModel.getAllProducts.restore());

    it('Returns an object', async () => {
      const res = await productsService.allProducts();
      expect(res).to.be.an('object');
      expect(res.result).to.have.key('products');
      expect(res.result.products).to.be.an('array');
      expect(res.status).to.be.equal(200);
    });
  });
});
/*====================================================*/
/* ============> BUSCAR PRODUTOS POR ID <============ */
describe('Search products by Id', () => {
  describe('Return search successfully', () => {
    before(() => sinon.stub(productsModel, 'getByIdProduct')
      .resolves(getProd.result.products));
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
/*====================================================*/
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
/*====================================================*/
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
});
/*====================================================*/
/* ===============> APAGAR PRODUTOS <================ */
describe('Create an endpoint to delete a product', () => {
  describe('Successfully deleted', () => {
    before(() => sinon.stub(productsModel, 'deleteProduct')
      .resolves(getProd.result.products));
    after(() => productsModel.deleteProduct.restore());

    it('Return an object with the product deleted', async () => {
      const res = await productsService.deleteService(_id);
      expect(res).to.be.an('object');
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
/* ==============> CADASTRAR PRODUTOS <============== */
describe('Create an endpoint for product registration', () => {
  describe('Success when registering', () => {
    before(() => sinon.stub(productsModel, 'createProduct').resolves(prod1));
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
/*====================================================*/
/* ===========> BUSCAR TODOS OS PRODUTOS <=========== */
describe('Create an endpoint to list products', () => {
  describe('List all products successfully', () => {
    before(() => sinon.stub(productsModel, 'getAllProducts')
      .resolves(getProd));
    after(() => productsModel.getAllProducts.restore());

    it('Returns an object with key product', async () => {
      const res = await productsService.allProducts();
      expect(res.result).to.be.a('object').to.have.key('products');
      expect(res.result.products).to.be.an('array');
      expect(res.result.products).to.be.an('array').to.have.length(1);
      expect(res.result.products[0]).to.be.an('object');
      expect(res.status).to.equal(200);
    });

    it('The products object contains an array of 1 object', async () => {
      const res = await productsService.allProducts();
      expect(res.result.products).to.be.an('array').to.have.length(1);
      expect(res.result.products[0]).to.be.an('object');
    });

    it('Return status 200', async () => {
      const res = await productsService.allProducts();
      expect(res.status).to.equal(200);
    });
  });
});
/*====================================================*/
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
  });
});
/*====================================================*/
