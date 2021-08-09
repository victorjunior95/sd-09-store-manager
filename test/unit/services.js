const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/products');
const salesModel = require('../../models/sales');
const productsService = require('../../services/products');
const salesService = require('../../services/sales');

describe('Create a new Product', () => {
  describe('when called', async () => {
    const product_ONE = { name: 'Product_ONE', quantity: 10 };
    const product_TWO = { name: 'Product_TWO', quantity: 10 };

    before(() => {
      const _id = '604cb554311d68f491ba5781';
      sinon.stub(productsModel, 'create').resolves({ _id });
    });

    after(() => {
      productsModel.create.restore();
    });

    it('returns an object', async () => productsService.create(product_ONE)
      .then((res) => expect(res).to.be.an('object')));

    it('has propertiy "data"', async () => productsService.create(product_TWO)
      .then((res) => expect(res).to.have.a.property('data')));
  });
});

describe('Get All Products', () => {
  describe('when DB is empty', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([]);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('returns an array', () => productsService.getAll()
      .then(({ data }) => expect(data).to.be.an('array')));

    it('array is empty', () => productsService.getAll()
      .then(({ data }) => expect(data).to.be.empty));
  });

  describe('when DB has itens', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves({ products: [
        { _id: '604cb554311d68f491ba5781', name: 'Product_ONE', quantity: 10 },
        { _id: '604cb554311d68f491ba5781', name: 'Product_TWO', quantity: 10 }
      ]});
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('returns an array', () => productsService.getAll()
      .then(({ data: { products } }) => expect(products).to.be.an('array')));

    it('array is not empty', () => productsService.getAll()
      .then(({ data: { products } }) => expect(products).to.not.be.empty));

    it('array has itens of type object', () => productsService.getAll()
      .then(({ data: { products: [item] } }) => expect(item).to.be.an('object')));

    it('object has properties "id", "name" and "quantity', async () => productsService.getAll()
      .then(({ data: { products: [item] } }) => expect(item).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Get one Product By "Id"', () => {
  describe('when DB is empty', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves(null);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('returns null', () => productsService.getById()
      .then(({ data }) => expect(data).to.be.null));
  });

  describe('when DB has itens', () => {
    const _id = '604cb554311d68f491ba5781';
    const product = { _id: _id, name: 'Product_ONE', quantity: 10 }
    before(() => {
      sinon.stub(productsModel, 'getById').resolves(product);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('returns an object', () => productsService.getById(_id)
      .then(({ data }) => expect(data).to.be.an('object')));

    it('object has properties "id", "name" and "quantity"', () => productsService.getById(_id)
      .then(({ data }) => expect(data).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Update one Product', () => {
  describe('when called', () => {
    const _id = '604cb554311d68f491ba5781';
    const product = { name: 'Product_ONE', quantity: 10 };
    const newProduct = { name: 'Product_ONE', quantity: 7 };

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      sinon.stub(productsModel, 'update').resolves({ _id, product });
    });

    after(() => {
      productsModel.update.restore();
    });

    it('returns an object', () => productsService.update(_id, product)
        .then(({ data }) => expect(data).to.be.an('object')));

    it('has property "id"', () => productsService.update(_id, newProduct)
        .then(({ data }) => expect(data).to.have.a.property('_id')));
  });
});

describe('Remove one Product', () => {
  describe('when called', () => {
    const _id = '604cb554311d68f491ba5781';

    before(() => {
      sinon.stub(productsModel, 'remove').resolves({ id: _id });
    });

    after(() => {
      productsModel.remove.restore();
    });

    it('expect item to be removed from DB', () => productsService.remove(_id)
        .then(() => productsService.getById(_id)
        .then(({ data }) => expect(data).to.be.null)));
  });
});

describe('Create a new Sale', () => {
  describe('when called', async () => {
    const _id = '604cb554311d68f491ba5781';
    const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

    before(() => {
      sinon.stub(salesModel, 'create').resolves({ _id, itensSold });
    });

    after(() => {
      salesModel.create.restore();
    });

    it('returns an object', async () => salesService.create(itensSold)
      .then((res) => expect(res).to.be.an('object')));

    it('has propertiy "data"', async () => salesService.create(itensSold)
      .then((res) => expect(res).to.have.a.property('data')));
  });
});

describe('Get All Sales', () => {
  describe('when DB is empty', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([]);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('returns an array', () => salesService.getAll()
      .then(({ data }) => expect(data).to.be.an('array')));

    it('array is empty', () => salesService.getAll()
      .then(({ data }) => expect(data).to.be.empty));
  });

  describe('when DB has itens', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves({ sales: [
        { _id: '604cb554311d68f491ba5781', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 1 }] },
        { _id: '604cb554311d68f491ba5781', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }] }
      ]});
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('returns an array', () => salesService.getAll()
      .then(({ data: { sales } }) => expect(sales).to.be.an('array')));

    it('array is not empty', () => salesService.getAll()
      .then(({ data: { sales } }) => expect(sales).to.not.be.empty));

    it('array has itens of type object', () => salesService.getAll()
      .then(({ data: { sales: [item] } }) => expect(item).to.be.an('object')));

    it('object has properties "id", "itensSold"', async () => salesService.getAll()
      .then(({ data: { sales: [item] } }) => expect(item).to.include.all.keys('_id', 'itensSold')));
  });
});

describe('Get one Sale By "Id"', () => {
  describe('when DB is empty', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves(null);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('returns null', () => salesService.getById()
      .then(({ data }) => expect(data).to.be.null));
  });

  describe('when DB has itens', () => {
    const _id = '604cb554311d68f491ba5781';
    const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];
    before(() => {
      sinon.stub(salesModel, 'getById').resolves(itensSold);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('returns an object', () => salesService.getById(_id)
      .then(({ data: [item] }) => expect(item).to.be.an('object')));

    it('object has properties "productId", and "quantity"', () => salesService.getById(_id)
      .then(({ data: [item] }) => expect(item).to.include.all.keys('productId', 'quantity')));
  });
});

describe('Update one Sale', () => {
  describe('when called', () => {
    const _id = '604cb554311d68f491ba5781';
    const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];
    const newItens = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 1 }];

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      sinon.stub(salesModel, 'update').resolves({ _id, itensSold });
    });

    after(() => {
      salesModel.update.restore();
    });

    it('returns an object', () => salesService.update(_id, itensSold)
        .then(({ data }) => expect(data).to.be.an('object')));

    it('has property "id"', () => salesService.update(_id, newItens)
        .then(({ data }) => expect(data).to.have.a.property('_id')));
  });
});

describe('Remove one Sale', () => {
  describe('when called', () => {
    const _id = '604cb554311d68f491ba5781';
    const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

    before(() => {
      sinon.stub(salesModel, 'remove').resolves({ _id, itensSold });
    });

    after(() => {
      salesModel.remove.restore();
    });

    it('expect item to be removed from DB', () => salesService.remove(_id)
        .then(() => salesService.getById(_id)
        .then(({ data }) => expect(data).to.be.null)));
  });
});
