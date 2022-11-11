const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products } = require('../models/mocks/products.model.mock');

describe('Testes de unidade do model de products', function () {
  afterEach(sinon.restore);

  it('Recupera a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Recupera a lista de produtos a partir do array', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  })
})