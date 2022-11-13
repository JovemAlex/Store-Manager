const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productServices } = require('../../../src/services');

const { products, invalidValue, createdProduct, validValue } = require('./mocks/products.services.mock');

describe('Testes de unidade do services de products', function () {
  describe('Listagem de produtos', function () {
    afterEach(sinon.restore);

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
    afterEach(sinon.restore);

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

  describe('Criação de um produto', function () {
    afterEach(sinon.restore);

    it('Retorna o produto criado', async function () {
      sinon.stub(productsModel, 'createProduct').resolves([createdProduct]);

      const result = await productServices.createProduct(validValue);

      expect(result.type).to.equal(null)
      expect(result.message).to.be.deep.equal([createdProduct]);
    });

    it('Retorna um erro ao produto não ser criado', async function () {
      sinon.stub(productsModel, 'createProduct').resolves(undefined);

      const result = await productServices.createProduct(validValue);

      expect(result.type).to.equal('PRODUCT_NOT_CREATED')
      expect(result.message).to.be.deep.equal('Product not created');
    });

    it('Retorna uma erro ao não passar uma string', async function () {
      const result = await productServices.createProduct(1);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"value" must be a string');
    });

    it('Retorna um erro ao não passar o name', async function () {
      const result = await productServices.createProduct(invalidValue);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"value" length must be at least 5 characters long');
    });
  });
});