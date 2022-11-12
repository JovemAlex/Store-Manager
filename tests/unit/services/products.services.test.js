const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productServices } = require('../../../src/services');

const { products, invalidValue } = require('./mocks/products.services.mock');

describe('Testes de unidade do services de products', function () {
  describe('Listagem de produtos', function () {
    it('Retorna a lista completa de produtos', async function () {
      sinon.stub(productsModel, 'getAll').resolves(products);

      const result = await productServices.getAll();

      expect(result.message).to.deep.equal(products);
    });

    it('Retorna um erro ao não encontrar o produto', async function () {
      sinon.stub(productsModel, 'getAll').resolves(undefined);

      const result = await productServices.getAll();

      expect(result.type).to.equal('LIST_NOT_FOUND');
      expect(result.message).to.equal('List not found');
    });
  });

  describe('Listagem de produtos a partir do ID', function () {
    it('Retorna a o produto com o ID equivalente', async function () {
      sinon.stub(productsModel, 'getById').resolves([[products[0]]]);

      const result = await productServices.getById(1);

      expect(result.message).to.deep.equal([[products[0]]]);
    });

    it('Retorna um erro ao passar um ID inválido', async function () {
      const result = await productServices.getById(invalidValue);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('Retorna um erro caso o produto não existe', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);
      const result = await productServices.getById(1);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});