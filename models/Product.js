const connection = require('./connection');

class Product {
  constructor() {
    this.collection = 'products';
  }

  async create(payload) {
    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.insertOne(payload))
      .then((result) => result.ops[0]);
  }

  async getAll() {
    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.find().toArray());
  }
}

module.exports = Product;
