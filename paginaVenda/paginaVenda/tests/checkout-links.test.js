import test from 'node:test';
import assert from 'node:assert/strict';
import webhookHandler from '../api/cakto/webhook.js';
import { isAllowedRequestOrigin } from '../api/_lib/security.js';
import { subscriptionPlans } from '../src/data/subscriptionPlans.js';

const createResponse = () => {
  const state = { status: 200, body: null, ended: false };
  return {
    state,
    response: {
      status(code) { state.status = code; return this; },
      json(body) { state.body = body; return this; },
      end() { state.ended = true; return this; },
    },
  };
};

test('a API aceita apenas origens do site, localhost ou previews da Vercel', () => {
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://cinestreamoficial.site' } }), true);
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://teste.vercel.app' } }), true);
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://site-malicioso.example' } }), false);
});

test('todos os planos redirecionam para checkouts públicos da Cakto', () => {
  assert.equal(subscriptionPlans.length, 4);
  for (const plan of subscriptionPlans) {
    assert.equal(plan.checkoutProvider, 'cakto');
    assert.match(plan.checkoutUrl, /^https:\/\/pay\.cakto\.com\.br\/[a-z0-9_]+$/i);
  }
  assert.equal(subscriptionPlans.find(({ slug }) => slug === 'mensal')?.checkoutUrl, 'https://pay.cakto.com.br/32sawv8');
});

test('o webhook da Cakto rejeita segredo incorreto e aceita o segredo configurado', async () => {
  const previousSecret = process.env.CAKTO_WEBHOOK_SECRET;
  process.env.CAKTO_WEBHOOK_SECRET = 'webhook-secret-test';

  const invoke = async (secret) => {
    const { state, response } = createResponse();
    const request = {
      method: 'POST',
      headers: {},
      query: {},
      body: { event: 'purchase_approved', secret, data: { id: 'order-test' } },
    };
    await webhookHandler(request, response);
    return state;
  };

  try {
    assert.equal((await invoke('segredo-incorreto')).status, 401);
    const accepted = await invoke('webhook-secret-test');
    assert.equal(accepted.status, 204);
    assert.equal(accepted.ended, true);
  } finally {
    if (previousSecret === undefined) delete process.env.CAKTO_WEBHOOK_SECRET;
    else process.env.CAKTO_WEBHOOK_SECRET = previousSecret;
  }
});
