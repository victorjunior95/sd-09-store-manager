const sinon = require('sinon');
const { expect } = require('chai');
const products = require('../../models/products')

describe('List all products', () => {
  describe('If there is no product', () => {
    it('should return an array', async () => {
      const response = await products.listAllProducts();

      expect(response).to.be.an('array');
    });
    it('the array should be empty', async () => {
      const response = await products.listAllProducts();
      expect(response).to.be.empty;
    })
  });
  describe('If there is at least one product', () => {
    it('should return an array', async () => {
      const response = await products.listAllProducts();
      expect(response).to.be.an('array');

    })
    it('the array should not be empty', async () => {
      const response = await products.listAllProducts();
      expect(response).to.not.be.empty;

    })
    it('the array has object type items', async () => {
      const [item] = await products.listAllProducts();
      expect(item).to.be.an('object')
    })
    it('the items should have "id", "name" and "quantity" properties', async () => {
      const  [item] = await products.listAllProducts();
      expect(item).to.include.all.keys('id', 'name', 'quantity');
    })
  })
})