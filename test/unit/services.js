const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

const productsService = require('../../services/productsServices');
const salesService = require('../../services/salesServices');
// constantes para os testes
const VALID_POST_INPUT_1 = {
  name: 'Graphgear 1000',
  quantity: 500,
};

const INVALID_POST_INPUT_1 = {
  name: 'G',
  quantity: 500,
};

const VALID_ID_1 = '60e84a58b6df1e18a10b4f40';
const VALID_ID_2 = '60e850da6d026823fa3ea8fc';

const VALID_SALE_INPUT_1 = [
  { 'productId': VALID_ID_1, 'quantity': 10 },
];

const VALID_PRODUCT_1 = {
  'name': 'Graphgear 1000',
  'quantity': 500,
  '_id': VALID_ID_1
};
const VALID_PRODUCT_2 = {
  'name': 'Graphgear 2000',
  'quantity': 300,
  '_id': VALID_ID_2
}

const VALID_UPDATE_INPUT = {
  'name': 'Graphgear 1000',
  'quantity': 850,
  '_id': VALID_ID_1
};

const VALID_PRODUCT_ID_1 = VALID_ID_1;

const METHOD_FAILURE = null;

const VALID_SALE_ARRAY_1 = [{ 'productId': VALID_ID_1, 'quantity': 10 }];
const VALID_SALE_ARRAY_2 = [{ 'productId': VALID_ID_2, 'quantity': 10 }];
const VALID_SALE_ARRAY_3 = [{ 'productId': VALID_ID_1, 'quantity': 10000 }];

const VALID_SALES_ARRAY = { sales: [
  { 'productId': VALID_ID_1, 'quantity': 200 },
  { 'productId': VALID_ID_2, 'quantity': 150 },
]};

const VALID_SALE_OUTPUT = {
  _id: VALID_ID_1,
  itensSold: VALID_SALE_ARRAY_1,
};

describe('Testes para a camada de Services',() => {
  describe('Testes para a rota "/products/"', () => {
    describe('Testes para o método POST', () => {
      afterEach(() => {
        productsModel.postNewProduct.restore();
      });
      describe('Quando o método obtem sucesso', () => {
        before(() => {
          sinon.stub(productsModel, 'postNewProduct')
            .resolves(VALID_PRODUCT_1);
        });

        it('deve retornar um objeto com os dados do produto inserido', async () => {
          const result = await productsService.postNewProduct(VALID_POST_INPUT_1);

          expect(result).to.be.an('object').to.have.all.keys('_id', 'name', 'quantity');
        });
      });
      describe('Quando o método falha', () => {
        before(() => {
          sinon.stub(productsModel, 'postNewProduct')
            .resolves(METHOD_FAILURE);
        });

        it('deve retornar um objeto do tipo erro, com código e mensagem', async () => {
          const result = await productsService.postNewProduct(INVALID_POST_INPUT_1);

          expect(result).to.exist;
          expect(result).to.be.an('object').to.have.key('err');
          expect(result.err).to.be.an('object').to.have.all.keys('code', 'message');
          expect(result.err.code).to.be.equal('invalid_data');
          expect(result.err.message).to.be.equal('Product already exists');
        });
      });
    //fim dos testes do método POST
    });
    describe('Testes para o método GET', () => {
      describe('Teste para a função getAllProducts', () => {
        before(() => {
          const getAll_SUCCESS = {
            'products': [
              VALID_PRODUCT_1,
              VALID_PRODUCT_2,
            ],
          };
          sinon.stub(productsModel, 'getAllProducts')
            .resolves(getAll_SUCCESS);
        });
        after(() => {
          productsModel.getAllProducts.restore();
        });

        it('deve retonar um objeto com uma chave products', async () => {
          const result = await productsService.getAllProducts();

          expect(result).to.be.an('object').to.have.key('products');
        });
        it('deve ter um array na chave products, com todos os produtos cadastrados', async () => {
          const result = await productsService.getAllProducts();

          expect(result.products).to.be.an('array').to.have.length(2);
          expect(result.products[0]).to.be.an('object');
          expect(result.products[1]).to.be.an('object');
        });
      });
      describe('Testes para a função getProductById', () => {
        afterEach(() =>{
          productsModel.getProductById.restore();
        });
        describe('Quando o método obtem sucesso', () => {
          before(() => {
            sinon.stub(productsModel, 'getProductById')
              .resolves(VALID_PRODUCT_1);
          });
          it('deve retornar um objeto com os dados do produto encontrado', async () => {
            const result = await productsService.getProductById(VALID_PRODUCT_ID_1);

            expect(result).to.be.an('object').to.have.all.keys('_id', 'name', 'quantity');
          });
        });
        describe('Quando o método falha', () => {
          before(() => {
            sinon.stub(productsModel, 'getProductById')
              .resolves(METHOD_FAILURE);
          });
          it('deve retornar um objeto do tipo erro, com código e mensagem', async () => {
            const result = await productsService.getProductById(VALID_PRODUCT_ID_1);

            expect(result).to.exist;
            expect(result).to.be.an('object').to.have.key('err');
            expect(result.err).to.be.an('object').to.have.all.keys('code', 'message');
            expect(result.err.code).to.be.equal('not_found');
            expect(result.err.message).to.be.equal('Product not found');
          });
        });
      })
    // fim do método GET
    });
    describe('Testes para o método PUT', () => {
      afterEach(() => {
        productsModel.updateProduct.restore();
      });
      describe('Quando o método faz o update com sucesso',() => {
        before(() => {
          sinon.stub(productsModel, 'updateProduct')
            .resolves(1);
        });
        it('deve retornar 1 como resposta', async () => {
        const result = await productsService.updateProduct(VALID_UPDATE_INPUT);

        expect(result).to.be.equal(1);
        });
      });
      describe('Quando o método não realiza o update', () => {
        before(() => {
          sinon.stub(productsModel, 'updateProduct')
            .resolves(0);
        });
        it('deve retornar 1 como resposta', async () => {
          const result = await productsService.updateProduct(VALID_UPDATE_INPUT);

          expect(result).to.be.equal(0);
        });
      });
    // fim do método PUT
    });
    describe('Testes para o método DELETE', () => {
      afterEach(() => {
        productsModel.deleteProduct.restore();
      });
      describe('Quando o método delete obtém sucesso', () => {
        before(() => {
          sinon.stub(productsModel, 'deleteProduct')
            .resolves(VALID_PRODUCT_2);
        });
        it('deve retornar um objeto com os dados do produto deletado', async () => {
          const result = await productsService.deleteProduct(VALID_PRODUCT_ID_1);

          expect(result).to.be.an('object').to.have.all.keys('_id', 'name', 'quantity');
        });
      });
      describe('Quanto o método delete falha', () => {
        before(() => {
          sinon.stub(productsModel, 'deleteProduct')
            .resolves(METHOD_FAILURE);
        });
        it('deve retornar um objeto do tipo erro, com código e mensagem', async () => {
          const result = await productsService.deleteProduct(VALID_PRODUCT_ID_1);

          expect(result).to.exist;
          expect(result).to.be.an('object').to.have.key('err');
          expect(result.err).to.be.an('object').to.have.all.keys('code', 'message');
          expect(result.err.code).to.be.equal('invalid_data');
          expect(result.err.message).to.be.equal('Wrong id format');
        });
      });
    //fim do método DELETE
    });
    describe('Teste para a função checkStock', () => {
      afterEach(() => {
        productsModel.getProductById.restore();
      });
      describe('Em caso de sucesso', () => {
        before(() => {
          sinon.stub(productsModel, 'getProductById')
            .resolves(VALID_PRODUCT_1);
        });
        it('deve retornar um null caso não tenha problemas', async () => {
          const result  = await productsService.checkStock(VALID_SALE_ARRAY_1);

          expect(result).to.be.an('object').to.be.empty;
        });
      });
      describe('Em caso de falha quando não tem o item em estoque', () => {
        before(() => {
          sinon.stub(productsModel, 'getProductById')
            .resolves(null);
        });
        it('deve retornar um erro com codigo e mensagem corretas', async () => {
          const result  = await productsService.checkStock(VALID_SALE_ARRAY_1);

          expect(result).to.be.an('object').to.have.keys('err')
          expect(result.err).to.be.an('object').to.have.all.keys('code', 'message');
          expect(result.err.code).to.be.equal('invalid_data');
          expect(result.err.message).to.be.equal('Não existe produto com o Id fornecido');
        });
      });
      describe('Em caso de falha quando não tem produtos o suficiente', () => {
        before(() => {
          sinon.stub(productsModel, 'getProductById')
            .resolves(VALID_PRODUCT_1);
        });
        it('deve retornar outro erro com codigo e mensagem corretas', async () => {
          const result  = await productsService.checkStock(VALID_SALE_ARRAY_3);

          expect(result).to.be.an('object').to.have.keys('err')
          expect(result.err).to.be.an('object').to.have.all.keys('code', 'message');
          expect(result.err.code).to.be.equal('stock_problem');
          expect(result.err.message).to.be.equal('Such amount is not permitted to sell');
        });
      });
    });
  // fim dos testes de products
  });
  describe('Testes para a rota "/sales/"', () => {
    describe('Testes para o método POST', () => {

      describe('Quando o método obtem sucesso', () => {
        before(() => {
          sinon.stub(salesModel, 'postNewSale')
            .resolves(VALID_PRODUCT_ID_1);
          sinon.stub(productsService, 'checkStock')
            .resolves({});
          sinon.stub(productsModel,'updateProductWhenSold')
            .resolves({});
        });
        after(() => {
          salesModel.postNewSale.restore();
          productsService.checkStock.restore();
          productsModel.updateProductWhenSold.restore();
        });
        it('deve retornar um Id referente a venda criada', async () => {
          const result = await salesService.postNewSale(VALID_SALE_INPUT_1);

          expect(result).to.be.an('string').to.have.length(24);
        })
      });
      describe('Quando o método falha no stockCheck', () => {
        before(() => {
          sinon.stub(productsService, 'checkStock')
            .resolves({err:{}});
        });
        after(() => {
          productsService.checkStock.restore();
        })
        it('deve retornar um objeto com o erro', async () => {
          const result = await salesService.postNewSale(VALID_SALE_INPUT_1);

          expect(result).to.be.an('object');
        });
      });
    //fim do método POST
    });
    describe('Testes do método GET', () => {
      describe('Testes da função getAllSales', () => {
        before(() => {
          sinon.stub(salesModel, 'getAllSales')
            .resolves(VALID_SALES_ARRAY);
        });
        after(() => {
          salesModel.getAllSales.restore();
        });
        it('deve retornar um objeto com uma chave sales', async () => {
          const result = await salesService.getAllSales();

          expect(result).to.be.an('object').to.have.key('sales');
        });
      })
      describe('Testes da função getSalesById', () => {
        afterEach(() => {
          salesModel.getSaleById.restore();
        });
        describe('Em caso de sucesso', async () => {
          before(() => {
            sinon.stub(salesModel, 'getSaleById')
              .resolves(VALID_SALE_OUTPUT);
          });
          it('deve retornar um objeto com chave "_id" e "itensSold"', async () => {
            const result = await salesService.getSaleById(VALID_ID_1);

            expect(result).to.be.an('object').to.have.all.keys('_id', 'itensSold');
          });
        });
        describe('Em caso de falha', async () => {
          before(() => {
            sinon.stub(salesModel, 'getSaleById')
              .resolves(METHOD_FAILURE);
          });
          it('deve retornar um objeto erro', async () => {
            const result = await salesService.getSaleById(VALID_ID_1);

            expect(result).to.be.an('object').to.have.keys('err');
          });
        });
      });
    // fim do método GET
    });
    describe('Testes do método PUT', () => {
      describe('Testes da função updateSales', () => {
        afterEach(() => {
          salesModel.updateSale.restore();
        });
        describe('Quando o método faz o update com sucesso', () => {
          before(() => {
            sinon.stub(salesModel, 'updateSale')
              .resolves(1);
          });
          it('deve receber um 1 resposta', async () => {
            const result = await salesService.updateSale(VALID_SALE_ARRAY_1);

            expect(result).to.be.equal(1);
          });
        });
        describe('Falha ao fazer o update', () => {
          describe('Falha pois não encontrou uma sale', () => {
            before(() => {
              sinon.stub(salesModel, 'updateSale')
                .resolves(null);
            });
            it('deve receber um null como resposta', async () => {
              const result = await salesService.updateSale(VALID_SALE_ARRAY_1);

              expect(result).to.be.null;
            });
          });
          describe('Falha pois não houve mudança nenhuma', () => {
            before(() => {
              sinon.stub(salesModel, 'updateSale')
                .resolves(0);
            });
            it('deve receber um null como resposta', async () => {
              const result = await salesService.updateSale(VALID_SALE_ARRAY_1);

              expect(result).to.be.equal(0);
            });
          });
        });
      });
    //fim to método PUT
    });
    describe('Testes do método DELETE', () => {
      afterEach(() => {
        salesModel.deleteSale.restore();
      });
      describe('Em caso de sucesso', () => {
        before(() => {
          sinon.stub(salesModel, 'deleteSale')
            .resolves(VALID_SALE_OUTPUT);
          sinon.stub(productsModel, 'updateProductsWhenDeleted')
            .resolves({});
        });
        it('deve retornar um objeto com os dados da venda', async () => {
          const result = await salesService.deleteSale();

          expect(result).to.be.an('object').to.have.all.keys('_id', 'itensSold');
        });
      });
      describe('Em caso de fracasso', () => {
        before(() => {
          sinon.stub(salesModel, 'deleteSale')
            .resolves(null);
        });
        it('deve retornar um objeto contendo um erro', async () => {
          const result = await salesService.deleteSale();

          expect(result).to.be.an('object').to.have.key('err');
          expect(result.err).to.be.an('object').to.have.all.keys('code','message');
          expect(result.err.code).to.be.equal('invalid_data');
          expect(result.err.message).to.be.equal('Wrong sale ID format');
        });
      });
    });
  // fim dos testes de sales
  });
// fim dos testes de Services
});