const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectID } = require('mongodb');
chai.use(chaiHttp);
const productController = require('../../controllers/productControler');
const productService = require('../../services/productServce');
const url = 'http://localhost:3000';
const server = require('../../index');
const { response } = require('express');
const mongoDbUrl = 'mongodb://localhost:27017';


describe('1 - controller /products', () => {
    let connection;
    let db;


    describe('Quando é passado o verbo get retorna?', () => {
        let responde;

        var expect = chai.expect;
        before(async () => {
            responde = await chai.request(server)
                .get('/products');

        })
        it('1-1 Retorna um Json', () => {
            expect(responde).to.be.a.json;
        }),
            it('1-2 O status é 200', () => {
                expect(responde).to.have.status(200);
            })

    });

    describe('Não  é ppossível consultar um produto inexistente', () => {
        let responde;

        var expect = chai.expect;
        before(async () => {
            responde = await chai.request(server)
                .get('/products/256802c7de23d3f077eb9');

        })
        it('1-2 Retorna um Json', () => {
            expect(responde).to.be.a.json;
        }),
            it('2-2 O status é 422', () => {
                expect(responde).to.have.status(422);
            })

    });


    before(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        db = connection.db('StoreManager');
        await db.collection('products').deleteMany({});
        await db.collection('sales').deleteMany({});
    });



    describe('Não é possivel cadastrar um produto?', () => {
        let responde;
        const errProduct = { name: 'livro', quantity: "354" };
        var expect = chai.expect;
        before(async () => {
            responde = await chai.request(server)
                .post('/products')
                .send(errProduct);


        })
        it('1-3 Retorna um objeto com a propriedade "err"', () => {
            expect(responde.body).to.have.haveOwnProperty('err');

        }),
            it('1-4 O status é 422', () => {
                expect(responde).to.have.status(422);
            })



    });


    describe('É possivel cadastrar um produto?', () => {
        let responde;
        const newProduct = { name: 'livro', quantity: 354 };
        const editProduct = { name: 'stiribidiway', quantity: 10 };
        var expect = chai.expect;
        before(async () => {
            responde = await chai.request(server)
                .post('/products')
                .send(newProduct);

        })
        it('1-3 Retorna um objeto com a propriedade "name"', () => {
            expect(responde.body).to.have.haveOwnProperty('name');

        }),
            it('1-4 O status é 201', () => {
                expect(responde).to.have.status(201);
            })



        describe('Quando o _id não existe não é possivel deletar', () => {
            let responde;
            var expect = chai.expect;

            before(async () => {
                responde = await chai.request(server)
                    .delete(`/products/123456`);
            })

            it('1-5 Retorna um objeto com a propriedade "err"', () => {
                expect(responde.body).to.have.haveOwnProperty('err');
            }),

                it('1-6 O status é 422', () => { expect(responde).to.have.status(422); })
        });



        describe('Não é possivel editar com o campo name.length menor que 3', () => {
            let responde;
            let prodFromDb;
            var expect = chai.expect;
            before(async () => {
                connection = await MongoClient.connect(mongoDbUrl, {
                    useNewUrlParser: true, useUnifiedTopology: true,
                });
                db = connection.db('StoreManager');
                prodFromDb = await db.collection('products').find().toArray();

            });


            before(async () => {
                responde = await chai.request(server)
                    .put(`/products/${ObjectID(prodFromDb[0]._id)}`)
                    .send({ name: 'xab', quantity: 123 });

                console.log('veio?', responde.body);
            })
            it('1-7 Retorna um objeto com a propriedade "err.code"', () => {

                expect(responde.body).to.have.haveOwnProperty(
                    'err').to.haveOwnProperty('code').equal('invalid_data');

            }),
                it('1-8 O status é 422', () => {
                    expect(responde).to.have.status(422);
                })
        });





        describe('Não é possivel editar com o campo quantity string', () => {
            let responde;
            let prodFromDb;
            var expect = chai.expect;
            before(async () => {
                connection = await MongoClient.connect(mongoDbUrl, {
                    useNewUrlParser: true, useUnifiedTopology: true,
                });
                db = connection.db('StoreManager');
                prodFromDb = await db.collection('products').find().toArray();

            });


            before(async () => {
                responde = await chai.request(server)
                    .put(`/products/${ObjectID(prodFromDb[0]._id)}`)
                    .send({ name: 'xxablau', quantity: '123' });

                console.log('veio?', responde.body);
            })
            it('1-7 Retorna um objeto com a propriedade "err.code"', () => {

                expect(responde.body).to.have.haveOwnProperty(
                    'err').to.haveOwnProperty('code').equal('invalid_data');

            }),
                it('1-8 O status é 422', () => {
                    expect(responde).to.have.status(422);
                })
        });



        describe('É possivel editar um produto?', () => {
            let responde;
            let prodFromDb;
            var expect = chai.expect;
            before(async () => {
                connection = await MongoClient.connect(mongoDbUrl, {
                    useNewUrlParser: true, useUnifiedTopology: true,
                });
                db = connection.db('StoreManager');
                prodFromDb = await db.collection('products').find().toArray();

            });


            before(async () => {
                responde = await chai.request(server)
                    .put(`/products/${ObjectID(prodFromDb[0]._id)}`)
                    .send(editProduct);


            })
            it('1-7 Retorna um objeto com a propriedade "name"', () => {

                expect(responde.body).to.have.haveOwnProperty('name').equal('stiribidiway');

            }),
                it('1-8 O status é 200', () => {
                    expect(responde).to.have.status(200);
                })
        });



        describe('É possivel deletar um produto?', () => {
            let responde;
            let prodFromDb;
            var expect = chai.expect;
            before(async () => {
                connection = await MongoClient.connect(mongoDbUrl, {
                    useNewUrlParser: true, useUnifiedTopology: true,
                });
                db = connection.db('StoreManager');
                prodFromDb = await db.collection('products').find().toArray();

            });


            before(async () => {
                responde = await chai.request(server)
                    .delete(`/products/${ObjectID(prodFromDb[0]._id)}`);

                console.log('veio?', responde.body.ok);
            })
            it('1-7 Retorna um objeto com a propriedade "deletedCount"', () => {

                expect(responde.body).to.have.haveOwnProperty('ok').equal(1);

            }),
                it('1-8 O status é 200', () => {
                    expect(responde).to.have.status(200);
                })
        });


    });

});


// &&&&&&&&&&&&&&&&&&&&&&&&&&    SALES CONTROLER  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


describe('2 - controller /sales', () => {
    before(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        db = connection.db('StoreManager');
        await db.collection('products').deleteMany({});
        await db.collection('sales').deleteMany({});
    });

    describe('Quando é passado o verbo get retorna?', () => {
        let responde;
        let prodFromDb;
        var expect = chai.expect;
        describe('2 - controller /sales', () => {
            let connection;
            let db;


            describe('Quando é passado o verbo get retorna?', () => {
                let responde;

                var expect = chai.expect;
                before(async () => {
                    responde = await chai.request(server)
                        .get('/sales');

                })
                it('2-1 Retorna um Json', () => {
                    expect(responde).to.be.a.json;
                }),
                    it('2-2 O status é 200', () => {
                        expect(responde).to.have.status(200);
                    })

            });


            describe('Não é possivel cadastrar uma venda se quantidade maior que o stoque', () => {
                let responde;
                let inserted;
                let id;
                let newSale;
                const newProduct = { name: 'livro', quantity: 354 };
                var expect = chai.expect;

                before(async () => {
                    connection = await MongoClient.connect(mongoDbUrl, {
                        useNewUrlParser: true, useUnifiedTopology: true,
                    });
                    db = connection.db('StoreManager');
                    inserted = await db.collection('products').insertOne(newProduct);
                    id = inserted.ops[0]._id,
                        newSale = [{ productId: id, quantity: 400 }]
                });


                before(async () => {
                    responde = await chai.request(server)
                        .post('/sales')
                        .send(newSale);

                })

            })
            it('2-3 Retorna um objeto com a propriedade "err.code"', () => {
                expect(responde.body).to.have.haveOwnProperty('err');

            }),
                it('2-3 Retorna um objeto com a propriedade "err" e codigo: "stock_problem" ', () => {
                    expect(responde.body).to.have.haveOwnProperty('err'
                    ).to.haveOwnProperty('code').equal('stock_problem');

                }),
                it('2-4 O status é 404', () => {
                    expect(responde).to.have.status(404);
                })



        });



        describe('Não é possivel cadastrar uma venda se quantidade menor que 0', () => {
            let responde;
            const errProduct = [{ _id: 'qwerwefv4w534tv5vg54g', quantity: -3 }];
            var expect = chai.expect;
            before(async () => {
                responde = await chai.request(server)
                    .post('/sales')
                    .send(errProduct);


            })
            it('2-3 Retorna um objeto com a propriedade "err.code"', () => {
                expect(responde.body).to.have.haveOwnProperty('err');

            }),
                it('2-3 Retorna um objeto com a propriedade "err"', () => {
                    expect(responde.body).to.have.haveOwnProperty('err'
                    ).to.haveOwnProperty('code').equal('invalid_data');

                }),
                it('2-4 O status é 422', () => {
                    expect(responde).to.have.status(422);
                })



        });


        describe('Não é possivel cadastrar uma venda com string no campo quantidade', () => {
            let responde;
            const errProduct = [{ _id: 'qwerwefv4w534tv5vg54g', quantity: '-3' }];
            var expect = chai.expect;
            before(async () => {
                responde = await chai.request(server)
                    .post('/sales')
                    .send(errProduct);


            })
            it('2-3 Retorna um objeto com a propriedade "err.code"', () => {
                expect(responde.body).to.have.haveOwnProperty('err');

            }),
                it('2-3 Retorna um objeto com a propriedade "err"', () => {
                    expect(responde.body).to.have.haveOwnProperty('err'
                    ).to.haveOwnProperty('code').equal('invalid_data');

                }),
                it('2-4 O status é 422', () => {
                    expect(responde).to.have.status(422);
                })



        });





        describe('É possivel cadastrar uma venda', () => {
            let responde;
            let inserted;
            let id;
            let newSale;
            const newProduct = { name: 'livro', quantity: 354 };
            var expect = chai.expect;

            before(async () => {
                connection = await MongoClient.connect(mongoDbUrl, {
                    useNewUrlParser: true, useUnifiedTopology: true,
                });
                db = connection.db('StoreManager');
                inserted = await db.collection('products').insertOne(newProduct);
                id = inserted.ops[0]._id,
                    newSale = [{ productId: id, quantity: 4 }]
            });


            before(async () => {
                responde = await chai.request(server)
                    .post('/sales')
                    .send(newSale);

            })

            //¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
            describe('Não é possivel cadastrar uma venda maior que o estoque', () => {
                let responde;
                let fromDb;
                let id;
                let newSale;
                var expect = chai.expect;

                before(async () => {
                    connection = await MongoClient.connect(mongoDbUrl, {
                        useNewUrlParser: true, useUnifiedTopology: true,
                    });
                    db = connection.db('StoreManager');
                    fromDb = await db.collection('products').find().toArray();
                    id = fromDb[0].ops[0]._id,
                        newSale = [{ productId: id, quantity: 9999 }]
                });


                before(async () => {
                    responde = await chai.request(server)
                        .post('/sales')
                        .send(newSale);
                    console.log(responde);

                })

                it('2-3 Retorna um array com a venda', () => {
                    expect(responde.body).to.have.haveOwnProperty('itensSold');

                }),
                    it('2-4 O status é 200', () => {
                        expect(responde).to.have.status(200);
                    })


            });


            it('2-3 Retorna um array com a venda', () => {
                expect(responde.body).to.have.haveOwnProperty('itensSold');

            }),
                it('2-4 O status é 200', () => {
                    expect(responde).to.have.status(200);
                })


        });

        describe('é possivel consultar uma venda', () => {
            let responde;
            var expect = chai.expect;
            let allSales;
            let saleId;
            before(async () => {
                connection = await MongoClient.connect(mongoDbUrl, {
                    useNewUrlParser: true, useUnifiedTopology: true,
                });
                db = connection.db('StoreManager');
                allSales = await db.collection('sales').find().toArray();
                saleId = allSales[0]._id;

            });



            before(async () => {
                responde = await chai.request(server)
                    .get(`/sales/${saleId}`);
            })

            it('1-5 Retorna um venda "err"', () => {
                expect(responde.body).to.have.haveOwnProperty('_id');
            }),

                it('1-6 O status é 200', () => { expect(responde).to.have.status(200); })
        });

        describe('Não é possivel editar se quantity menor que 0', () => {
            let responde;
            var expect = chai.expect;
            const id = '60df0662d01c78d226bcad79';


            before(async () => {
                responde = await chai.request(server)
                    .put(`/sales/${id}`)
                    .send([{ productId: '60df0662d01c78d226bcad79', quantity: -1 }]);

            })
            it('1-7 Retorna um objeto com a propriedade "err.code"', () => {

                expect(responde.body).to.have.haveOwnProperty(
                    'err').to.haveOwnProperty('code').equal('invalid_data');

            }),
                it('1-8 O status é 422', () => {
                    expect(responde).to.have.status(422);
                })
        });

        describe('Não é possivel editar se quantity igual a 0', () => {
            let responde;
            var expect = chai.expect;
            const id = '60df0662d01c78d226bcad79';


            before(async () => {
                responde = await chai.request(server)
                    .put(`/sales/${id}`)
                    .send([{ productId: '60df0662d01c78d226bcad79', quantity: 0 }]);


            })
            it('1-7 Retorna um objeto com a propriedade "err.code"', () => {

                expect(responde.body).to.have.haveOwnProperty(
                    'err').to.haveOwnProperty('code').equal('invalid_data');

            }),
                it('1-8 O status é 422', () => {
                    expect(responde).to.have.status(422);
                })
        });






        describe('Não é possivel editar quantity for string', () => {
            let responde;
            var expect = chai.expect;
            const id = '60df0662d01c78d226bcad79';


            before(async () => {
                responde = await chai.request(server)
                    .put(`/sales/${id}`)
                    .send([{ productId: '60df0662d01c78d226bcad79', quantity: '9' }]);

                console.log('veio?', responde.body);
            })
            it('1-7 Retorna um objeto com a propriedade "err.code"', () => {

                expect(responde.body).to.have.haveOwnProperty(
                    'err').to.haveOwnProperty('code').equal('invalid_data');

            }),
                it('1-8 O status é 422', () => {
                    expect(responde).to.have.status(422);
                })
        });



        describe('É possivel editar uma venda', () => {
            let responde;
            let allSales;
            let saleId;

            var expect = chai.expect;
            let toEdit;

            before(async () => {
                connection = await MongoClient.connect(mongoDbUrl, {
                    useNewUrlParser: true, useUnifiedTopology: true,
                });
                db = connection.db('StoreManager');
                allSales = await db.collection('sales').find().toArray();
                saleId = allSales[0]._id;
                toEdit = [{ productId: allSales[0].itensSold[0].productId, quantity: 2 }]

            });


            before(async () => {
                responde = await chai.request(server)
                    .put(`/sales/${saleId}`)
                    .send(toEdit);


            })
            it('1-7 Retorna um objeto com a propriedade "itensSold"', () => {

                expect(responde.body).to.have.haveOwnProperty('itensSold');

            }),
                it('1-8 O status é 200', () => {
                    expect(responde).to.have.status(200);
                })
        });



        describe('Não é possivel deletar uma venda inexistente', () => {
            let responde;
            var expect = chai.expect;

            before(async () => {
                responde = await chai.request(server)
                    .delete(`/sales/60df1e4c088a9df975ee96bf`);

            })
            it('1-7 Retorna um objeto com a propriedade "err"', () => {

                expect(responde.body).to.have.haveOwnProperty('err');

            }),
                it('1-8 O status é 200', () => {
                    expect(responde).to.have.status(422);
                })
        });

        describe('É possivel deletar uma venda', () => {
            let responde;
            let allSales;
            let saleId;

            var expect = chai.expect;
            let toEdit;

            before(async () => {
                connection = await MongoClient.connect(mongoDbUrl, {
                    useNewUrlParser: true, useUnifiedTopology: true,
                });
                db = connection.db('StoreManager');
                allSales = await db.collection('sales').find().toArray();
                saleId = allSales[0]._id;


            });


            before(async () => {
                responde = await chai.request(server)
                    .delete(`/sales/${saleId}`);



            })
            it('1-7 Retorna um objeto com a propriedade "itensSold"', () => {

                expect(responde.body).to.have.haveOwnProperty('itensSold');

            }),
                it('1-8 O status é 200', () => {
                    expect(responde).to.have.status(200);
                })
        });



    });

});

