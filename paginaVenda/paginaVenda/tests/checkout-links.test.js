import test from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedRequestOrigin } from '../api/_lib/security.js';
import { subscriptionPlans } from '../src/data/subscriptionPlans.js';

test('a API aceita apenas origens do site, localhost ou previews da Vercel', () => {
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://cinestreamoficial.site' } }), true);
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://teste.vercel.app' } }), true);
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://site-malicioso.example' } }), false);
});

test('todos os planos ativos redirecionam para checkouts públicos HTTPS', () => {
  assert.equal(subscriptionPlans.length, 3);
  for (const plan of subscriptionPlans) {
    assert.equal(plan.checkoutProvider, 'external');
    assert.match(plan.checkoutUrl, /^https:\/\//i);
  }
  assert.equal(subscriptionPlans.some(({ slug }) => slug === 'vitalicio'), false);
});
