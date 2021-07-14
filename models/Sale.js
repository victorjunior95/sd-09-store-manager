const { ObjectID } = require('mongodb');
const connection = require('./connection');

class Sale {
  constructor(items, id) {
    this.collection = 'sales';
    this.items = items ? this._validateItemsID(items) : [];
    this.id = id;
  }

  _validateItemsID(items) {
    for (const item of items) {
      if (!ObjectID.isValid(item.productId)) return null;
    }
    return items;
  }

  create() {
    return !this.items
      ? null
      : connection()
        .then((db) => db.collection(this.collection))
        .then((collection) => collection.insertOne({ itensSold: this.items }))
        .then((result) => result.ops[0]);
  }

  getAll() {
    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.find().toArray());
  }

  get(id) {
    return !ObjectID.isValid(id)
      ? null
      : connection()
        .then((db) => db.collection(this.collection))
        .then((collection) => collection.findOne({ _id: ObjectID(id) }))
        .then((result) => result ? result : {});
  }

  update() {
    return !ObjectID.isValid(this.id)
      ? null
      : connection()
        .then((db) => db.collection(this.collection))
        .then((collection) => collection.findOneAndUpdate(
          { _id: ObjectID(this.id) },
          { $set: { itensSold: this.items } },
          { returnOriginal: false },
        ))
        .then((result) => !result.value ? {} : result.value);
  }

  remove(id) {
    return !ObjectID.isValid(id)
      ? null
      : connection()
        .then((db) => db.collection(this.collection))
        .then((collection) => collection.findOneAndDelete({ _id: ObjectID(id) }))
        .then((result) => !result.value ? {} : result.value);
  }
}

module.exports = Sale;
