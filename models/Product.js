const { ObjectID, ObjectId } = require('mongodb');
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

  async get(id) {
    if (!ObjectID.isValid(id)) return null;

    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.find({ _id: ObjectId(id) }).toArray())
      .then((result) => result.length ? result[0] : []);
  }

  async update(payload) {
    const { id } = payload;
    if (!ObjectId.isValid(id)) return null;

    delete payload.id;

    return connection()
      .then((db) => db.collection(this.collection))
      .then(
        (collection) => collection.findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: payload },
          { returnOriginal: false }
        )
      ).then((result) => !result.value ? {} : result.value );
  }
}

module.exports = Product;
