const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/products');
const salesService = require('../../services/sales');
const productsController = require('../../controllers/products');
const salesController = require('../../controllers/sales');

describe('Create a new Product', () => {
  describe('when called', () => {
    const res = {};
    const req = {};
    const data = { name: 'Product_ONE', quantity: 10 };

    before(() => {
      req.body = data;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(productsService, 'create').resolves({ status: 201, data });
    });

    after(() => {
      productsService.create.restore();
    });

    it('returns HTTP status 201', () => productsController.create(req, res)
      .then(() => expect(res.status.calledWith(201)).to.be.equal(true)));

    it('returns an object', () => productsController.create(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });
});

describe('Get All Products', () => {
  describe('when DB is empty', () => {
    const res = {};
    const req = {};
    const data = [];

    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(productsService, 'getAll').resolves({ status: 200, data });
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('returns HTTP status 200', () => productsController.getAll(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => productsController.getAll(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });

  describe('when DB has items', () => {
    const res = {};
    const req = {};
    const data = [
      { _id: '604cb554311d68f491ba5781', name: 'Product_ONE', quantity: 10 },
      { _id: '604cb554311d68f491ba5781', name: 'Product_TWO', quantity: 10 }
    ];

    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(productsService, 'getAll').resolves({ status: 200, data });
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('returns HTTP status 200', () => productsController.getAll(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => productsController.getAll(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });
});

describe('Get one Product By "Id"', () => {
  describe('when DB is empty', () => {
    const res = {};
    const req = {};
    const data = {};

    before(() => {
      req.body = {};
      req.params = { id: '5f43cbf4c45ff5104986e81d' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(productsService, 'getById').resolves({ status: 200, data });
    });

    after(() => {
      productsService.getById.restore();
    });

    it('returns HTTP status 200', () => productsController.getById(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => productsController.getById(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });

  describe('when DB has items', () => {
    const res = {};
    const req = {};
    const data = { name: 'Product_ONE', quantity: 10 };

    before(() => {
      req.body = {};
      req.params = { id: '5f43cbf4c45ff5104986e81d' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(productsService, 'getById').resolves({ status: 200, data });
    });

    after(() => {
      productsService.getById.restore();
    });

    it('returns HTTP status 200', () => productsController.getById(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => productsController.getById(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });
});

describe('Update one Product', () => {
  describe('when called', () => {
    const res = {};
    const req = {};
    const data = { name: 'Product_ONE', quantity: 10 };

    before(() => {
      req.body = data;
      req.params = { id: '5f43cbf4c45ff5104986e81d' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(productsService, 'update').resolves({ status: 200, data });
    });

    after(() => {
      productsService.update.restore();
    });

    it('returns HTTP status 200', () => productsController.update(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => productsController.update(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });
});

describe('Remove one Product', () => {
  describe('when called', () => {
    const res = {};
    const req = {};
    const data = {};

    before(() => {
      req.body = {};
      req.params = { id: '5f43cbf4c45ff5104986e81d' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(productsService, 'remove').resolves({ status: 200, data });
    });

    after(() => {
      productsService.remove.restore();
    });

    it('returns HTTP status 200', () => productsController.remove(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => productsController.remove(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });
});

describe('Create a new Sale', () => {
  describe('when called', () => {
    const res = {};
    const req = {};
    const data = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

    before(() => {
      req.body = data;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(salesService, 'create').resolves({ status: 200, data });
    });

    after(() => {
      salesService.create.restore();
    });

    it('returns HTTP status 200', () => salesController.create(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an array', () => salesController.create(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)));
  });
});

describe('Get All Sales', () => {
  describe('when DB is empty', () => {
    const res = {};
    const req = {};
    const data = [];

    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(salesService, 'getAll').resolves({ status: 200, data });
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('returns HTTP status 200', () => salesController.getAll(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => salesController.getAll(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });

  describe('when DB has items', () => {
    const res = {};
    const req = {};
    const data = [
      { _id: '604cb554311d68f491ba5781', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 1 }] },
      { _id: '604cb554311d68f491ba5781', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }] }
    ];

    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(salesService, 'getAll').resolves({ status: 200, data });
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('returns HTTP status 200', () => salesController.getAll(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => salesController.getAll(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });
});

describe('Get one Sale By "Id"', () => {
  describe('when DB is empty', () => {
    const res = {};
    const req = {};
    const data = [];

    before(() => {
      req.body = {};
      req.params = { id: '5f43cbf4c45ff5104986e81d' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(salesService, 'getById').resolves({ status: 200, data });
    });

    after(() => {
      salesService.getById.restore();
    });

    it('returns HTTP status 200', () => salesController.getById(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an array', () => salesController.getById(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)));
  });

  describe('when DB has items', () => {
    const res = {};
    const req = {};
    const data = [
      { _id: '604cb554311d68f491ba5781', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 1 }] },
      { _id: '604cb554311d68f491ba5781', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }] }
    ];

    before(() => {
      req.body = {};
      req.params = { id: '5f43cbf4c45ff5104986e81d' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(salesService, 'getById').resolves({ status: 200, data });
    });

    after(() => {
      salesService.getById.restore();
    });

    it('returns HTTP status 200', () => salesController.getById(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an array', () => salesController.getById(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)));
  });
});

describe('Update one Sale', () => {
  describe('when called', () => {
    const res = {};
    const req = {};
    const data = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

    before(() => {
      req.body = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];
      req.params = { id: '5f43cbf4c45ff5104986e81d' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(salesService, 'update').resolves({ status: 200, data });
    });

    after(() => {
      salesService.update.restore();
    });

    it('returns HTTP status 200', () => salesController.update(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => salesController.update(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });
});

describe('Remove one Sale', () => {
  describe('when called', () => {
    const res = {};
    const req = {};
    const data = {};

    before(() => {
      req.body = {};
      req.params = { id: '5f43cbf4c45ff5104986e81d' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(data);
      sinon.stub(salesService, 'remove').resolves({ status: 200, data });
    });

    after(() => {
      salesService.remove.restore();
    });

    it('returns HTTP status 200', () => salesController.remove(req, res)
      .then(() => expect(res.status.calledWith(200)).to.be.equal(true)));

    it('returns an object', () => salesController.remove(req, res)
      .then(() => expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)));
  });
});
