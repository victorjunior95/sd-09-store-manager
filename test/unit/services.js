const sinon = require('sinon');
const { expect } = require('chai');

const ProductModel = require('../../models/productModel');
const SaleModel = require('../../models/salesModel');

const ProductService = require('../../services/productService');
const SaleModel = require('../../services/salesService');

describe('Search all the products', () => {
  describe('when there isn\'t any product', () => {
    before(() => {
      sinon.stub(ProductModel, 'getAll')
        .resolves([])
    })
  })
})
