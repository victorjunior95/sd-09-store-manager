const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../services/sales.service');
const productsService = require('../../services/products.service');
const salesModel = require('../../models/sales.model');
const productsModel = require('../../models/products.model');


describe('Services Tests', () => {
  describe('Products Service Tests', () => {
    describe('Function listProducts', () => {
      describe('if the list is empty', () => {
        before(() => {
          sinon.stub(productsModel, 'listProducts').resolves([]);
        });
  
        after(() => {
          productsModel.listProducts.restore();
        });

        it('return an object', async () => {
          const response = await productsService.getProductList();

          expect(response).to.be.an('object');
        });

        it('object has correct properties', async () => {
          const response = await productsService.getProductList();

          expect(response).to.include.all.keys('status', 'data');
        });

        it('property status is a number', async () => {
          const { status } = await productsService.getProductList();

          expect(status).to.be.a('number');
        });

        it('property data is an object', async () => {
          const { data } = await productsService.getProductList();

          expect(data).to.be.an('object');
        });

        it('property data has correct properties', async () => {
          const { data } = await productsService.getProductList();

          expect(data).to.include.all.keys('products');
        });

        it('data.products is an array', async () => {
          const { data: { products } } = await productsService.getProductList();

          expect(products).to.be.an('array');
        });
  
        it('data.products is empty', async () => {
          const { data: { products } } = await productsService.getProductList();

          expect(products).to.be.empty;
        }); 
      });

      describe('if the list has at least one item', () => {
        before(() => {
          sinon.stub(productsModel, 'listProducts').resolves([{
            _id: '2j3h13kjh123kj1h',
            name: 'Becks'
          }]);
        });
  
        after(() => {
          productsModel.listProducts.restore();
        });

        it('return an object', async () => {
          const response = await productsService.getProductList();

          expect(response).to.be.an('object');
        });

        it('object has correct properties', async () => {
          const response = await productsService.getProductList();

          expect(response).to.include.all.keys('status', 'data');
        });

        it('property status is a number', async () => {
          const { status } = await productsService.getProductList();

          expect(status).to.be.a('number');
        });

        it('property data is an object', async () => {
          const { data } = await productsService.getProductList();

          expect(data).to.be.an('object');
        });

        it('property data has correct properties', async () => {
          const { data } = await productsService.getProductList();

          expect(data).to.include.all.keys('products');
        });

        it('data.products is an array', async () => {
          const { data: { products } } = await productsService.getProductList();

          expect(products).to.be.an('array');
        });


        it('item of data.products is an object', async () => {
          const { data: { products: [item] } } = await productsService.getProductList();

          expect(item).to.be.an('object');
        });

        it('item of data.products has correct properties', async () => {
          const { data: { products: [item] } } = await productsService.getProductList();

          expect(item).to.include.all.keys('_id', 'name');
        });
      });
    });

    describe('Function validateProduct', () => {
      describe('when is creating a product', () => {
        before(() => {
          sinon.stub(productsModel, 'findProductByName').resolves(null);
        });

        after(() => {
          productsModel.findProductByName.restore();
        });

        it('name is less than 5 characters', async () => {
          const response = await productsService
            .validateProduct({ name: 'Sol', quantity: 5 }, 'post');
  
          expect(response).to.be.an('object');
          expect(response).to.include.all.keys('code', 'message');
        });

        it('quantity isn\'t a number', async () => {
          const response = await productsService
            .validateProduct({ name: 'Heineken', quantity: '15' });
  
          expect(response).to.be.an('object');
          expect(response).to.include.all.keys('code', 'message');
        });

        it('quantity is less than 1', async () => {
          const response = await productsService
            .validateProduct({ name: 'Heineken', quantity: 0 }, 'post');
  
          expect(response).to.be.an('object');
          expect(response).to.include.all.keys('code', 'message');
        });

        it('product is valid', async () => {
          const response = await productsService
            .validateProduct({ name: 'Heineken', quantity: 5 }, 'post');
  
          expect(response).to.be.undefined;
        });

        it('product already exists', async () => {
          productsModel.findProductByName.resolves({ name: 'Heineken', quantity: 5 })

          const response = await productsService
            .validateProduct({ name: 'Heineken', quantity: 5 }, 'post');
  
          expect(response).to.be.an('object');
          expect(response).to.include.all.keys('code', 'message');
        });
      });

      describe('when is updating a product', () => {
        before(() => {
          sinon.stub(productsModel, 'findProductByName').resolves(null);
        });

        after(() => {
          productsModel.findProductByName.restore();
        });

        it('name is less than 5 characters', async () => {
          const response = await productsService
            .validateProduct({ name: 'Sol', quantity: 5 });
  
          expect(response).to.be.an('object');
          expect(response).to.include.all.keys('code', 'message');
        });

        it('quantity isn\'t a number', async () => {
          const response = await productsService
            .validateProduct({ name: 'Heineken', quantity: '15' });
  
          expect(response).to.be.an('object');
          expect(response).to.include.all.keys('code', 'message');
        });

        it('quantity is less than 1', async () => {
          const response = await productsService
            .validateProduct({ name: 'Heineken', quantity: 0 });
  
          expect(response).to.be.an('object');
          expect(response).to.include.all.keys('code', 'message');
        });

        it('product is valid', async () => {
          const response = await productsService
            .validateProduct({ name: 'Heineken', quantity: 5 });
  
          expect(response).to.be.undefined;
        });
      });
    });

    describe('Function createProduct', () => {
      describe('hasn\'t validation error', () => {
        before(() => {
          sinon.stub(productsService, 'validateProduct').resolves(undefined);
          sinon.stub(productsModel, 'addProduct')
            .resolves({ _id: '32313132kjk', name: 'Heineken', quantity: 10 });
        });
  
        after(() => {
          productsService.validateProduct.restore();
          productsModel.addProduct.restore();
        });

        it('return an object', async () => {
          const product = await productsService
            .createProduct({ name: 'Heineken', quantity: 10 });
          
          expect(product).to.be.an('object');
        });

        it('object has correct properties', async () => {
          const product = await productsService
            .createProduct({ name: 'Heineken', quantity: 10 });
        
          expect(product).to.have.all.keys('status', 'data');
        });
      });
    });

    describe('Function getProductById', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductById')
          .resolves({ _id: '12345', name: 'Heineken', quantity: 10 });
      });

      after(() => {
        productsModel.getProductById.restore();
      });

      it('return an object', async () => {
        const product = await productsService.getProductById('12345');

        expect(product).to.be.an('object');
      });
      it('object has corrects properties', async () => {
        const product = await productsService.getProductById('12345');

        expect(product).to.have.all.keys('status', 'data');
      });
    });

    describe('Function deleteProductById', () => {
      before(() => {
        sinon.stub(productsModel, 'deleteProductById')
          .resolves({ name: 'Heineken', quantity: 10 });
      });

      after(() => {
        productsModel.deleteProductById.restore();
      });

      it('return an object', async () => {
        const deletedProduct = await productsService.deleteProductById('123');

        expect(deletedProduct).to.be.an('object');
      });

      it('object has correct properties', async () => {
        const deletedProduct = await productsService.deleteProductById('123');

        expect(deletedProduct).to.have.all.keys('status', 'data');
      });
    });
  });
  describe('Sales Service Tests', () => {
    describe('Sale verification', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductById')
          .resolves({ quantity: 10 });
      });

      after(() => {
        productsModel.getProductById.restore();
      });

      it('if quantity is not a number', async () => {
        const response = await salesService.saleVerification({ quantity: '10', id: '123' });

        expect(response).to.be.an('object');
        expect(response).to.have.all.keys('status', 'data');
      });

      it('if quantity is lower to 1', async () => {
        const response = await salesService.saleVerification({ quantity: 0, id: '123' });

        expect(response).to.be.an('object');
        expect(response).to.have.all.keys('status', 'data');
      });

      it('quantity of sale is bigger that quantity of product', async () => {
        const response = await salesService.saleVerification({ quantity: 11, id: '123' });

        expect(response).to.be.an('object');
        expect(response).to.have.all.keys('status', 'data');
      });

      it('valid sale', async () => {
        const response = await salesService.saleVerification({ quantity: 11, id: '123' });

        expect(response).to.be.an('object');
        expect(response).to.have.all.keys('status', 'data');
      });
    });

    describe('Create Sale', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductById').resolves({quantity: 13})
        sinon.stub(salesService, 'saleVerification').resolves(null);
        sinon.stub(productsModel, 'saleProduct').resolves(null);
        sinon.stub(salesModel, 'createSales').resolves({ quantity: 10 });
      });

      after(() => {
        salesService.saleVerification.restore();
        productsModel.saleProduct.restore();
        salesModel.createSales.restore();
        productsModel.getProductById.restore();
      });

      it('return an object', async () => {
        const sales = await salesService.createSales([{ productId: 12, quantity: 12 }]);

        expect(sales).to.be.an('object');
        expect(sales).to.have.all.keys('status', 'data');
      });
    });

    describe('getSalesList', () => {
      before(() => {
        sinon.stub(salesModel, 'listSales').resolves([]);
      });

      after(() => {
        salesModel.listSales.restore();
      });
      it('returns a correct object', async () => {
        const list = await salesService.getSalesList();

        expect(list).to.be.an('object');
        expect(list).to.have.all.keys('status', 'data');
      });
    });

    describe('getSaleById', () => {
      before(() => {
        sinon.stub(salesModel, 'getSaleById').resolves({});
      });
      after(() => {
        salesModel.getSaleById.restore();
      });

      it('return a correct object', async () => {
        const list = await salesService.getSaleById(123);
  
        expect(list).to.be.an('object');
        expect(list).to.have.all.keys('status', 'data');
      });

    });

    describe('deleteSale', () => {
      before(() => {
        sinon.stub(salesModel, 'deleteSaleById').resolves({itensSold: []});
      });

      after(() => {
        salesModel.deleteSaleById.restore();
      });

      it('return a correct object', async () => {
        const list = await salesService.deleteSaleById(123);
  
        expect(list).to.be.an('object');
        expect(list).to.have.all.keys('status', 'data');
      });
    });
  });
});
