const sinon = require('sinon');
const { expect } = require('chai');
const modelProduct = require('../../models/product');
const modelSales = require('../../models/sales');
const servicesProduct = require('../../services/product');
const servicesSales = require('../../services/sales');
const util = require('../../utils')

describe('Testes para services', () => {
  describe('Quando não existe produtos cadastrado', () => {
    before(() => {
      sinon.stub(modelProduct, 'findProductAll')
        .resolves([]);
    });

    after(() => {
      modelProduct.findProductAll.restore();
    });

    it('retorna um array', async () => {
      const response = await servicesProduct.FindAll();

      expect(response).to.be.an('array');
    });
    it('retorna um array vazio', async () => {
      const response = await servicesProduct.FindAll();

      expect(response).to.be.empty;
    });
    describe('Quando busca pelo "id"' , () => {
      before(() => {
        sinon.stub(modelProduct, 'findProductId')
          .resolves('null');
      });

      after(() => {
        modelProduct.findProductId.restore();
      });

      it('retorna nulo', async () => {
        const id = '810c14cc73c79eb34f6f9039'
        const response = await servicesProduct.FindId(id);

        expect(response).to.equal('null');
      });
    });
    describe('Quando cria produto' , () => {
      before(() => {
        sinon.stub(modelProduct, 'create')
          .resolves({ message: "ok", ops: [{
          "_id": "5f43a7ca92d58904914656b6",
          "name": "Produto do Batista",
          "quantity": 100
        }]});
      });

      before(() => {
        sinon.stub(modelProduct, 'findProductName')
          .resolves([]);
      });

      after(() => {
        modelProduct.findProductName.restore();
        modelProduct.create.restore();
      });

      it('retorna objeto', async () => {
        const name = 'bola de ouro';
        const quantity = 100;
        const response = await modelProduct.create(name, quantity);

        expect(response.ops[0]).to.be.an('object');
      });
      it('retorna objeto com chaves obrigatorias', async () => {
        const name = 'bola de ouro';
        const quantity = 100;
        const response = await modelProduct.create(name, quantity);

        expect(response.ops[0]).to.includes.keys('_id', 'name', 'quantity');
      });
      it('retorna objeto quando da erro', async () => {
        const name = 'bbb';
        const quantity = 100;
        const response = await modelProduct.create(name, quantity);

        expect(response).to.be.an('object');
      });
    });
  });

  describe('Quando existe produtos cadastrado', () => {
    before(() => {
      sinon.stub(modelProduct, 'findProductAll')
        .resolves([
          {
           _id: '610c14cc73c79eb34f6f9034',
          name: 'martelo de thor',
          quantity: 100
        }
      ]);
    });

    after(() => {
      modelProduct.findProductAll.restore();
    });

    it('retorna um array', async () => {
      const response = await servicesProduct.FindAll();

      expect(response).to.be.an('array');
    });
    it('array não pode estar vazio', async () => {
      const response = await servicesProduct.FindAll();

      expect(response).to.not.be.empty;
    });
    it('itens do array é objetos', async () => {
      const [response] = await servicesProduct.FindAll();

      expect(response).to.be.an('object');
    });
    it('objetos do array contem chaves obrigatoria', async () => {
      const [response] = await servicesProduct.FindAll();

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
    describe('Quando busca pelo "id"' , () => {
      before(() => {
        sinon.stub(modelProduct, 'findProductId')
          .resolves({
            _id: '610c14cc73c79eb34f6f9034',
            name: 'martelo de thor e ho',
            quantity: 100
          }
        );
      });

      after(() => {
        modelProduct.findProductId.restore();
      });

      it('retorna um objeto', async () => {
        const id = '610c14cc73c79eb34f6f9034'
        const response = await servicesProduct.FindId(id);

        expect(response).to.be.an('object');
      });
      it('objeto tem chaves obrigatorias', async () => {
        const id = '610c14cc73c79eb34f6f9034'
        const response = await servicesProduct.FindId(id);

        expect(response).to.includes.keys('_id', 'name', 'quantity');
      });
    });
    describe('Quando atualiza produto"' , () => {
      before(() => {
        sinon.stub(modelProduct, 'updateProduct')
          .resolves({
            _id: '610c14cc73c79eb34f6f9034',
            name: 'martelo de thor',
            quantity: 100
          }
        );
      });

      after(() => {
        modelProduct.updateProduct.restore();
      });

      it('retorna um objeto', async () => {
        const id = '610c14cc73c79eb34f6f9034'
        const name = 'roupa masculina';
        const quantity = 200;
        const response = await servicesProduct.upidate(id, name, quantity);

        expect(response).to.be.an('object');
      });
      it('objeto tem chaves obrigatorias', async () => {
        const id = '610c14cc73c79eb34f6f9034'
        const name = 'roupa masculina';
        const quantity = 200;
        const response = await servicesProduct.upidate(id, name, quantity);

        expect(response).to.includes.keys('_id', 'name', 'quantity');
      });
      it('retorna erro para quantity', async () => {
        const id = '610c14cc73c79eb34f6f9034'
        const name = 'roupa masculina';
        const quantity = 0;
        try {
          await servicesProduct.upidate(id, name, quantity);
        }
        catch(err) {
          expect(err.message).to.eql('"quantity" must be larger than or equal to 1');
        }
      });
    });
    describe('Quando deleta produto"' , () => {
      before(() => {
        sinon.stub(modelProduct, 'deleteProduct')
          .resolves({
            _id: '610c14cc73c79eb34f6f9034',
            name: 'martelo de thor',
            quantity: 100
          }
        );
        sinon.stub(modelProduct, 'findProductId')
          .resolves({
            _id: '610c14cc73c79eb34f6f9034',
            name: 'martelo de thor',
            quantity: 100
          }
        );
      });

      after(() => {
        modelProduct.findProductId.restore();
        modelProduct.deleteProduct.restore();
      });

      it('retorna um objeto', async () => {
        const id = '610c14cc73c79eb34f6f9034';
        const response = await servicesProduct.deleteProduct(id);

        expect(response).to.be.an('object');
      });
      it('objeto tem chaves obrigatorias', async () => {
        const id = '610c14cc73c79eb34f6f9034'
        const response = await servicesProduct.deleteProduct(id);

        expect(response).to.includes.keys('_id', 'name', 'quantity');
      });
    });
    describe('Quando tenta criar produto já existente"' , () => {
      before(() => {
        sinon.stub(modelProduct, 'create')
          .resolves({mesaage: 'ok', ops: [
            {
              _id: '610c14cc73c79eb34f6f9034',
              name: 'martelo de thor',
              quantity: 100
            }
          ]}
        );
      });
      before(() => {
        sinon.stub(modelProduct, 'findProductName')
          .resolves([]
        );
      });

      after(() => {
        modelProduct.findProductName.restore();
        modelProduct.create.restore();
      });

      it('retorna um objeto', async () => {
        const name = 'martelo de thor';
        const quantity = 100
        const response = await servicesProduct.create(name, quantity);
        console.log(response);
        expect(response).to.be.an('object');
      });

    });

  });

  describe('Quando não existe vendas cadastrado', () => {
    before(() => {
      sinon.stub(modelSales, 'findSales')
        .resolves([]);
    });

    after(() => {
      modelSales.findSales.restore();
    });

    it('retorna um array', async () => {
      const response = await servicesSales.findSales();

      expect(response).to.be.an('array');
    });
    it('retorna um array vario', async () => {
      const response = await servicesSales.findSales();

      expect(response).to.be.empty;
    });
    describe('Quando busca pelo "id"' , () => {
      before(() => {
        sinon.stub(modelSales, 'findSalesId')
          .resolves('null');
      });

      after(() => {
        modelSales.findSalesId.restore();
      });

      it('retorna nulo', async () => {
        const id = '5f43ba273200020b101fe49f';
        const response = await servicesSales.findSalesId(id);

        expect(response).to.equal('null');
      });
    });
    describe('Quando cria venda' , () => {
      before(() => {
        sinon.stub(modelSales, 'addSales')
          .resolves({ message: 'ok', ops: [
            {
              _id: "5f43ba333200020b101fe4a0",
              itensSold: [
                {
                  productId: "5f43ba273200020b101fe49f",
                  quantity: 2
                }
              ]
            }
          ] }
        );
        sinon.stub(modelProduct, 'findProductId')
          .resolves({
            _id: "610d99aa772c6d476c2b8a81",
            name: "meu produto",
            quantity: 100
          }
        );
      });

      after(() => {
        modelSales.addSales.restore();
        modelProduct.findProductId.restore();
      });

      it('retorna um objeto', async () => {
        const prod = [{ productId: "610d99aa772c6d476c2b8a81", quantity: 1 }];
        const response = await servicesSales.createSales(prod);

        expect(response).to.be.an('object');
      });
      it('retorna erro para quanttity', async () => {
        const prod = [{ productId: "610d99aa772c6d476c2b8a81", quantity: 0 }];
        try {
          await servicesSales.createSales(prod);
        }
        catch(err) {
          expect(err.message).to.equal('Wrong product ID or invalid quantity');
        }
      });
      it('retorna erro quando venda é maior', async () => {
        const prod = [{ productId: "610d99aa772c6d476c2b8a81", quantity: 200 }];
        try {
          await servicesSales.createSales(prod);
        }
        catch(err) {
          expect(err.message).to.equal('Such amount is not permitted to sell');
        }
      });
    });
  });
  describe('Quando existe venda cadastrada', () => {
    before(() => {
      sinon.stub(modelSales, 'findSales')
        .resolves([
          {
            _id: "5f43ba333200020b101fe4a0",
            itensSold: [
              {
                productId: "5f43ba273200020b101fe49f",
                quantity: 2
              }
            ]
          }
        ]
      );
    });

    after(() => {
      modelSales.findSales.restore();
    });

    it('retorna um array', async () => {
      const id = "5f43ba333200020b101fe4a0";
      const response = await servicesSales.findSales();

      expect(response).to.be.an('array');
    });
    it('array não pode estar vazio', async () => {
      const id = "5f43ba333200020b101fe4a0";
      const response = await servicesSales.findSales();

      expect(response).to.not.be.empty;
    });
    it('itens do array é objetos', async () => {
      const id = "5f43ba333200020b101fe4a0";
      const [response] = await servicesSales.findSales();

      expect(response).to.be.an('object');
    });
    it('objetos do array contem chaves obrigatoria', async () => {
      const id = "5f43ba333200020b101fe4a0";
      const [response] = await servicesSales.findSales(id);

      expect(response).to.include.all.keys('_id', 'itensSold');
    });
    describe('Quando busca pelo "id"' , () => {
      before(() => {
        sinon.stub(modelSales, 'findSalesId')
          .resolves({
            _id: "5f43ba333200020b101fe4a0",
            itensSold: [
              {
                productId: "5f43ba273200020b101fe49f",
                quantity: 2
              }
            ]
          }
        );
      });

      after(() => {
        modelSales.findSalesId.restore();
      });

      it('retorna um objeto', async () => {
        const id = "5f43ba333200020b101fe4a0";
        const response = await servicesSales.findSalesId(id);

        expect(response).to.be.an('object');
      });
      it('objeto tem chaves obrigatorias', async () => {
        const id = "5f43ba333200020b101fe4a0";
        const response = await servicesSales.findSalesId(id);

        expect(response).to.includes.keys('_id', 'itensSold');
      });
    });
    describe('Quando atualiza venda"' , () => {
      before(() => {
        sinon.stub(modelSales, 'updateSales')
          .resolves({
            _id: "5f43ba333200020b101fe4a0",
            itensSold: [
              {
                productId: "5f43ba273200020b101fe49f",
                quantity: 2
              }
            ]
          }
        );
      });

      before(() => {
        sinon.stub(modelSales, 'findSalesId')
          .resolves({
            _id: "5f43ba333200020b101fe4a0",
            itensSold: [
              {
                productId: "5f43ba273200020b101fe49f",
                quantity: 2
              }
            ]
          }
        );
      });

      after(() => {
        modelSales.updateSales.restore();
        modelSales.findSalesId.restore();
      });

      it('retorna um objeto', async () => {
        const id = "5f43ba333200020b101fe4a0";
        const sale = [{
          productId: "5f43ba273200020b101fe49f",
          quantity: 2
        }];
        const response = await servicesSales.updateSales(id, sale);

        expect(response).to.be.an('object');
      });
      it('objeto tem chaves obrigatorias', async () => {
        const id = "5f43ba333200020b101fe4a0";
        const sale = [{
          productId: "5f43ba273200020b101fe49f",
          quantity: 2
        }];
        const response = await servicesSales.updateSales(id, sale);

        expect(response).to.includes.keys('_id', 'itensSold');
      });
      it('retorna erro para quantity', async () => {
        const id = "5f43ba333200020b101fe4a0";
        const sale = [{
          productId: "5f43ba273200020b101fe49f",
          quantity: 'nove'
        }];

        try {
          await servicesSales.updateSales(id, sale);
         }
         catch(err){
          expect(err.message).to.equal('Wrong product ID or invalid quantity');
        }
      });
    });
    describe('Quando deleta venda' , () => {
      before(() => {
        sinon.stub(modelSales, 'deleteSales')
          .resolves({
            _id: "5f43ba333200020b101fe4a0",
            itensSold: [
              {
                productId: "5f43ba273200020b101fe49f",
                quantity: 2
              }
            ]
          }
        );
        sinon.stub(modelSales, 'findSalesId')
          .resolves({
            _id: "5f43ba333200020b101fe4a0",
            itensSold: [
              {
                productId: "5f43ba273200020b101fe49f",
                quantity: 2
              }
            ]
          }
        );
      });

      after(() => {
        modelSales.findSalesId.restore();
        modelSales.deleteSales.restore();
      });

      it('retorna um objeto', async () => {
        const id = "5f43ba333200020b101fe4a0";
        const response = await servicesSales.deleteSales(id);

        expect(response).to.be.an('object');
      });
    });
  });
});

