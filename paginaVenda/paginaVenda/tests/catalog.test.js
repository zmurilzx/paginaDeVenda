import test from 'node:test';
import assert from 'node:assert/strict';
import { getProductById, products } from '../src/data/products.js';

test('o catálogo possui identificadores e links de atendimento válidos', () => {
  assert.equal(products.length, 3);
  assert.equal(new Set(products.map(({ id }) => id)).size, products.length);

  for (const product of products) {
    assert.match(product.purchaseLink, /^https:\/\/wa\.me\/5543999748808\?text=/);
    assert.ok(product.name);
    assert.ok(product.brand);
    assert.ok(product.model);
    assert.ok(product.price);
    assert.ok(product.features.length >= 4);
  }
});

test('a busca de produto aceita id de rota e rejeita id inexistente', () => {
  assert.equal(getProductById('1')?.name, 'Amazon Fire TV Stick 4K');
  assert.equal(getProductById('999'), undefined);
});
