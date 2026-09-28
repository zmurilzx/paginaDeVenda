import test from 'node:test';
import assert from 'node:assert/strict';
import { subscriptionPlans } from '../src/data/subscriptionPlans.js';

test('todos os planos ativos redirecionam para checkouts públicos HTTPS', () => {
  assert.equal(subscriptionPlans.length, 3);
  for (const plan of subscriptionPlans) {
    assert.equal(plan.checkoutProvider, 'external');
    assert.match(plan.checkoutUrl, /^https:\/\//i);
  }
  assert.equal(subscriptionPlans.some(({ slug }) => slug === 'vitalicio'), false);
});
