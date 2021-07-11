const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsServices');
const productsController = require('../../controllers/productsController');

const salesService = require('../../services/salesServices');
const salesController = require('../../controllers/salesController');

// constantes para trabalhar
const VALID_ID_1 = '60e87e1a0bc6b05cd666801b';
const VALID_ID_2 = '60e87e1a0bc6b05cd666802c';
const VALID_ID_3 = '60e87e1a0bc6b05cd666803d';
const VALID_ID_4 = '60e87e1a0bc6b05cd666805f';

const VALID_NAME_1 = 'Graphgear 1000';
const VALID_NAME_2 = 'Graphgear 2000';
const VALID_NAME_3 = 'Graphgear 3000';

const VALID_QUANTITY_1 = 30;
const VALID_QUANTITY_2 = 40;
const VALID_QUANTITY_3 = 50;

const VALID_BODY_POST = {
  name: VALID_NAME_1,
  quantity: VALID_QUANTITY_1,
};

const VALID_PRODUCT_RESPONSE_1 = {
  _id: VALID_ID_1,
  name: VALID_NAME_1,
  quantity: VALID_QUANTITY_1,
};
const VALID_PRODUCT_RESPONSE_2 = {
  _id: VALID_ID_2,
  name: VALID_NAME_2,
  quantity: VALID_QUANTITY_2,
};

const VALID_ERROR = {
  err: {},
};

const VALID_SALE_ARRAY_1 = [{ 'productId': VALID_ID_1, 'quantity': 20 }];
const VALID_SALE_ARRAY_2 = [{ 'productId': VALID_ID_2, 'quantity': 15 }];

const VALID_SALE_OUTPUT_1 = {
  _id: VALID_ID_3,
  itensSold: VALID_SALE_ARRAY_1,
};

const VALID_SALE_OUTPUT_2 = {
  _id: VALID_ID_4,
  itensSold: VALID_SALE_ARRAY_2,
};

const VALID_SALES_ARRAY = { sales: [
  VALID_SALE_OUTPUT_1,
  VALID_SALE_OUTPUT_2,
]};

describe('Testes da camada de Controller', () => {
  describe('Testes para a rota "/products/"', () => {
    describe('Testes para o método POST' , () => {
      describe('Quando o pedido é completado com sucesso', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(productsService, 'postNewProduct')
          .resolves(VALID_PRODUCT_RESPONSE_1);
          request.body = VALID_BODY_POST;

          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          });

        after(() => { productsService.postNewProduct.restore() });

        it('deve retornar um código 201', async () => {
          await productsController.postNewProduct(request, response);

          expect(response.status.calledWith(201)).to.be.equal(true);
        });

        it('deve retornar um json com o produto cadastrado', async () => {
          await productsController.postNewProduct(request, response);

          expect(response.json.calledWith(VALID_PRODUCT_RESPONSE_1)).to.be.true;
        });
      });

      describe('Quando já existe um produto, e assim retorna um erro', () => {
        const request = {};
        const response = {};
        let next = {};

        before(() => {
          sinon.stub(productsService, 'postNewProduct')
            .resolves(VALID_ERROR);
          request.body = {};
          next = sinon.stub().resolves(VALID_ERROR);
          });
        after(() => { productsService.postNewProduct.restore() });

        it('passar um erro para tratamento com o next', async () => {
          await productsController.postNewProduct(request, response, next);

          expect(next.calledWith(sinon.match.object)).to.be.true;
          expect(next.calledWith(VALID_ERROR.err)).to.be.true;
        });
      });
    // fim do método POST
    });

    describe('Testes para o método GET' , () => {
      describe('Quando o método não recebe um ID e chama a função getAllProducts', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(productsService, 'getAllProducts')
          .resolves({ products: [VALID_PRODUCT_RESPONSE_1, VALID_PRODUCT_RESPONSE_2] });
          request.params = {};
          request.body = {};
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns({ products: [VALID_PRODUCT_RESPONSE_1, VALID_PRODUCT_RESPONSE_2] });
        });

        after(() => { productsService.getAllProducts.restore() });

        it('deve retornar o codigo 200', async () => {
          await productsController.getProducts(request, response);

          expect(response.status.calledWith(200)).to.be.true;
        });
        it('deve enviar como response um object json', async () => {
          await productsController.getProducts(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
        });
      });

      describe('O método recebe um id e chama a função getProductById', () => {
        describe('Encontra um produto com sucesso', () => {
          const request = {};
          const response = {};

          before(() => {
            sinon.stub(productsService, 'getProductById')
            .resolves(VALID_PRODUCT_RESPONSE_1);
            request.params = {id: VALID_ID_1};
            request.body = {};
            response.status = sinon.stub()
              .returns(response);
            response.json = sinon.stub()
              .returns(VALID_PRODUCT_RESPONSE_1);
          });

          after(() => { productsService.getProductById.restore() });

          it('deve retornar o codigo 200', async () => {
            await productsController.getProducts(request, response);

            expect(response.status.calledWith(200)).to.be.true;
          });
          it('deve ter como retorno um objeto', async () => {
            await productsController.getProducts(request, response);

            expect(response.json.calledWith(sinon.match.object)).to.be.true;
          });
        });

        describe('Não encontra nenhum produto com o ID fornecido', () => {
          const request = {};
          const response = {};
          let next = {};

          before(() => {
            sinon.stub(productsService, 'getProductById')
              .resolves(VALID_ERROR);
            request.params = {id: VALID_ID_1};
            request.body = {};
            next = sinon.stub().resolves(VALID_ERROR);
          });

          after(() => { productsService.getProductById.restore() });

          it('passar um erro para tratamento com o next', async () => {
            await productsController.getProducts(request, response, next);

            expect(next.calledWith(sinon.match.object)).to.be.true;
            expect(next.calledWith(VALID_ERROR.err)).to.be.true;
          });
        });
      });
    // fim do método GET
    });
    describe('Testes para o método PUT' , () => {
      describe('Quando o produto é atualizado com sucesso', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(productsService, 'updateProduct')
            .resolves(1);
          request.body =  VALID_BODY_POST;
          request.params = {id: VALID_ID_1};
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns(VALID_PRODUCT_RESPONSE_1);
        });

        after(() => { productsService.updateProduct.restore() });

        it('deve retornar o código 200', async () => {
          await productsController.updateProduct(request, response);

          expect(response.status.calledWith(200)).to.be.true;
        });
        it('deve enviar como response um object json', async () => {
          await productsController.updateProduct(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
        });
      });
      describe('Quando o método não atualiza um objeto com sucesso', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(productsService, 'updateProduct')
            .resolves(0);
          request.body =  VALID_BODY_POST;
          request.params = {id: VALID_ID_1};
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns(VALID_ERROR);
        });

        after(() => { productsService.updateProduct.restore() });

        it('deve retornar o código 400', async () => {
          await productsController.updateProduct(request, response);

          expect(response.status.calledWith(400)).to.be.true;
        });
        it('deve enviar um objeto erro como resposta', async () => {
          await productsController.updateProduct(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
        });
      });
    // fim do método PUT
    });
    describe('Testes para o método DELETE' , () => {
      describe('Em caso de sucesso', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(productsService, 'deleteProduct')
            .resolves(VALID_PRODUCT_RESPONSE_1);
          request.params = {id: VALID_ID_1};
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
        });

        after(() => { productsService.deleteProduct.restore() });

        it('deve retornar um código 200', async () => {
          await productsController.deleteProduct(request, response);

          expect(response.status.calledWith(200)).to.be.true;
        });
        it('deve enviar como response um object json', async () => {
          await productsController.deleteProduct(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
          expect(response.json.calledWith(VALID_PRODUCT_RESPONSE_1)).to.be.true;
        });
      });
      describe('Quando não foi possivel deletar um produto', () => {
        const request = {};
        const response = {};
        let next = {};

        before(() => {
          sinon.stub(productsService, 'deleteProduct')
            .resolves(VALID_ERROR);
          request.params = {id: VALID_ID_1};
          next = sinon.stub().resolves(VALID_ERROR);
        });

        after(() => { productsService.deleteProduct.restore() });

        it('passar um erro para tratamento com o next', async () => {
          await productsController.deleteProduct(request, response, next);

          expect(next.calledWith(sinon.match.object)).to.be.true;
          expect(next.calledWith(VALID_ERROR.err)).to.be.true;
        });
      });
    // fim do método Delete
    });
  // fim da rota 'products'
  });
  describe('Testes para a rota "/sales/"', () => {
    describe('Testes para o método POST' , () => {
      describe('Quando o método cadastra uma venda com sucesso', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(salesService, 'postNewSale')
            .resolves(VALID_ID_1);
          request.body = VALID_SALE_ARRAY_1;
          response.status = sinon.stub()
            .returns(response)
          response.json = sinon.stub()
            .returns();
        });

        after(() => { salesService.postNewSale.restore() });

        it('deve retornar um código 200', async () => {
          await salesController.postNewSale(request, response);

          expect(response.status.calledWith(200)).to.be.equal(true);
        });
        it('deve enviar como response um object json', async () => {
          await salesController.postNewSale(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
        });
      });
      describe('Quando o método falha em postar uma venda nova', () => {
        const request = {};
        const response = {};
        let next = {};
        before(() => {
          sinon.stub(salesService, 'postNewSale')
            .resolves(VALID_ERROR);
          request.body = VALID_SALE_ARRAY_1;
          next = sinon.stub().resolves(VALID_ERROR);
        });

        after(() => { salesService.postNewSale.restore() });

        it('deve enviar ao next um objeto do tipo erro', async () => {
          await salesController.postNewSale(request, response, next);

          expect(next.calledWith(sinon.match.object)).to.be.true;
          expect(next.calledWith(VALID_ERROR.err)).to.be.true;
        });
      });
      // fim do método POST
    });
    describe('Testes para o método GET' , () => {
      describe('Quando recebe um ID e chama a função getAllSales', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(salesService, 'getAllSales')
            .resolves(VALID_SALES_ARRAY);
          request.params = {};
          request.body = {};
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns(VALID_SALES_ARRAY);
        });

        after(() => { salesService.getAllSales.restore() });

        it('deve retornar o codigo 200', async () => {
          await salesController.getSales(request, response);

          expect(response.status.calledWith(200)).to.be.true;
        });
        it('deve enviar como response um object json', async () => {
          await salesController.getSales(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
        });
      });
      describe('Quando recebe um ID e chama a função getSaleById', () => {
        describe('Quando encontra ua venda com sucesso', () => {
          const request = {};
          const response = {};

          before(() => {
            sinon.stub(salesService, 'getSaleById')
              .resolves(VALID_SALE_OUTPUT_1);
            request.params = {id: VALID_ID_3};
            request.body = {};
            response.status = sinon.stub()
              .returns(response);
            response.json = sinon.stub()
              .returns(VALID_SALE_OUTPUT_1);
          });

          after(() => { salesService.getSaleById.restore() });

          it('deve retornar um codigo 200', async () => {
            await salesController.getSales(request, response);

            expect(response.status.calledWith(200)).to.be.true;
          });
          it('deve ter como retorno um objeto', async () => {
            await salesController.getSales(request, response);

            expect(response.json.calledWith(sinon.match.object)).to.be.true;
          });
        });
        describe('Não encontra uma venda com o ID fornecido', () => {
          const request = {};
          const response = {};
          let next = {};

          before(() => {
            sinon.stub(salesService, 'getSaleById')
              .resolves(VALID_ERROR);
            request.params = {id: VALID_ID_1};
            request.body = {};
            next = sinon.stub().resolves(VALID_ERROR);
          });

          after(() => { salesService.getSaleById.restore() });

          it('passar um erro para tratamento com o next', async () => {
            await salesController.getSales(request, response, next);

            expect(next.calledWith(sinon.match.object)).to.be.true;
            expect(next.calledWith(VALID_ERROR.err)).to.be.true;
          });
        });
      });
    // fim do método GET
    });
    describe('Testes para o método PUT' , () => {
      describe('Quando a venda é atualizada com sucesso', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(salesService, 'updateSale')
            .resolves(1);
            request.body = VALID_SALE_ARRAY_1;
            request.params = VALID_ID_3;
            response.status = sinon.stub()
              .returns(response);
            response.json = sinon.stub()
              .returns(VALID_SALE_OUTPUT_1);
        });

        after(() => { salesService.updateSale.restore() });

        it('deve retornar o código 200', async () => {
          await salesController.updateSale(request, response);

          expect(response.status.calledWith(200)).to.be.true;
        });
        it('deve enviar como response um object json', async () => {
          await salesController.updateSale(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
        });
      });
      describe('Quando o método não atualiza uma venda com sucesso', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(salesService, 'updateSale')
            .resolves(0);
            request.body = VALID_SALE_ARRAY_1;
            request.params = VALID_ID_3;
            response.status = sinon.stub()
              .returns(response);
            response.json = sinon.stub()
              .returns(VALID_ERROR);
        });

        after(() => { salesService.updateSale.restore() });

        it('deve retornar o código 400', async () => {
          await salesController.updateSale(request, response);

          expect(response.status.calledWith(400)).to.be.true;
        });

        it('deve enviar um objeto erro como resposta', async () => {
          await salesController.updateSale(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
        });
      });
    // fim do método PUT
    });
    describe('Testes para o método DELETE' , () => {
      describe('Em caso de sucesso', () => {
        const request = {};
        const response = {};

        before(() => {
          sinon.stub(salesService, 'deleteSale')
            .resolves(VALID_SALE_OUTPUT_1);
            request.params = {id: VALID_ID_3};
            response.status = sinon.stub()
              .returns(response);
            response.json = sinon.stub()
              .returns();
        });
        after(() => { salesService.deleteSale.restore() });

        it('deve retornar um código 200', async () => {
          await salesController.deleteSale(request, response);

          expect(response.status.calledWith(200)).to.be.true;
        });
        it('deve enviar como response um object json', async () => {
          await salesController.deleteSale(request, response);

          expect(response.json.calledWith(sinon.match.object)).to.be.true;
          expect(response.json.calledWith(VALID_SALE_OUTPUT_1)).to.be.true;
        });
      });
      describe('Quando não foi possivel deletar uma venda', () => {
        const request = {};
        const response = {};
        let next = {};

        before(() => {
          sinon.stub(salesService, 'deleteSale')
            .resolves(VALID_ERROR);
          request.params = {id: VALID_ID_3};
          next = sinon.stub().resolves(VALID_ERROR);
        });

        after(() => { salesService.deleteSale.restore() });

        it('passar um erro para tratamento com o next', async () => {
          await salesController.deleteSale(request, response, next);

          expect(next.calledWith(sinon.match.object)).to.be.true;
          expect(next.calledWith(VALID_ERROR.err)).to.be.true;
        });
      });
    // fim do método Delete
    });
  // fim da rota 'sales'
  });
});
