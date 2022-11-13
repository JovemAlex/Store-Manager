const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, createdProduct } = require('../models/mocks/products.model.mock');

const name = 'teste';

describe('Testes de unidade do model de products', function () {
  afterEach(sinon.restore);

  it('Recupera a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Recupera a lista de produtos a partir do ID', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cria um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModel.createProduct(name);

    expect(result).to.be.deep.equal({id: 4, name});
  })
})