import test from 'node:test';
import assert from 'node:assert/strict';
import paymentHandler from '../api/cakto/payment.js';
import webhookHandler from '../api/cakto/webhook.js';
import { isAllowedRequestOrigin, publicPaymentError } from '../api/_lib/cakto.js';
import { getPlanConfig, PLAN_SLUGS } from '../api/_lib/plans.js';

const fakeEnvironment = {
  CAKTO_MONTHLY_PRODUCT_ID: 'product-monthly',
  CAKTO_MONTHLY_OFFER_ID: 'offer-monthly',
  CAKTO_SEMESTRAL_PRODUCT_ID: 'product-semestral',
  CAKTO_SEMESTRAL_OFFER_ID: 'offer-semestral',
  CAKTO_ANNUAL_PRODUCT_ID: 'product-annual',
  CAKTO_ANNUAL_OFFER_ID: 'offer-annual',
  CAKTO_LIFETIME_PRODUCT_ID: 'product-lifetime',
  CAKTO_LIFETIME_OFFER_ID: 'offer-lifetime',
};

test('o backend mantém uma configuração fechada para os quatro planos', () => {
  assert.deepEqual(PLAN_SLUGS, ['mensal', 'semestral', 'anual', 'vitalicio']);
  assert.deepEqual(getPlanConfig('anual', fakeEnvironment), {
    slug: 'anual',
    productId: 'product-annual',
    offerId: 'offer-annual',
  });
  assert.equal(getPlanConfig('inexistente', fakeEnvironment), null);
});

test('a API aceita apenas origens do site, localhost ou previews da Vercel', () => {
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://cinestreamoficial.site' } }), true);
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://teste.vercel.app' } }), true);
  assert.equal(isAllowedRequestOrigin({ headers: { origin: 'https://site-malicioso.example' } }), false);
});

test('a API repassa erros estruturados da Cakto para diagnóstico do checkout', () => {
  const error = new Error('A Cakto recusou a operação.');
  error.status = 400;
  error.details = { items: ['Oferta não encontrada para o produto informado.'] };

  assert.equal(publicPaymentError(error), 'Oferta não encontrada para o produto informado.');
});

test('o endpoint rejeita plano desconhecido antes de chamar a Cakto', async () => {
  const request = { method: 'POST', headers: { origin: 'http://localhost:3000' }, body: { plan: 'alterado' } };
  const state = { status: 200, body: null };
  const response = {
    status(code) { state.status = code; return this; },
    json(body) { state.body = body; return this; },
  };

  await paymentHandler(request, response);
  assert.equal(state.status, 400);
  assert.equal(state.body.error, 'Plano inválido.');
});

test('o backend cria o payload Pix com IDs definidos no servidor, sem cobrança real', async () => {
  const originalFetch = global.fetch;
  const previousEnvironment = Object.fromEntries(
    Object.keys({ ...fakeEnvironment, CAKTO_CLIENT_ID: '', CAKTO_CLIENT_SECRET: '' })
      .map((key) => [key, process.env[key]]),
  );
  Object.assign(process.env, fakeEnvironment, { CAKTO_CLIENT_ID: 'test-client', CAKTO_CLIENT_SECRET: 'test-secret' });

  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    if (url.endsWith('/public_api/token/')) {
      return new Response(JSON.stringify({ access_token: 'test-token', expires_in: 3600 }), { status: 200 });
    }
    return new Response(JSON.stringify({
      id: '11111111-1111-4111-8111-111111111111',
      refId: 'TESTE123', status: 'waiting_payment', paymentMethod: 'pix', amount: '28.40',
      pix: { qrCode: 'pix-code', qrCodeBase64: 'data:image/png;base64,dGVzdGU=', expiresAt: '2099-01-01T00:00:00Z' },
    }), { status: 201 });
  };

  const request = {
    method: 'POST',
    headers: { origin: 'http://localhost:3000' },
    body: {
      plan: 'mensal', paymentMethod: 'pix',
      customer: { name: 'Cliente Teste', email: 'cliente@example.com', phone: '11999999999', docNumber: '12345678901' },
      deviceId: 'fp-test-session', antifraudReference: `antifraud-test-reference-${'x'.repeat(300)}`,
      idempotencyKey: '22222222-2222-4222-8222-222222222222',
    },
  };
  const state = { status: 200, body: null };
  const response = { status(code) { state.status = code; return this; }, json(body) { state.body = body; return this; } };

  try {
    await paymentHandler(request, response);
    assert.equal(state.status, 201);
    assert.equal(calls.length, 2);
    const paymentPayload = JSON.parse(calls[1].options.body);
    assert.equal(paymentPayload.productId, 'product-monthly');
    assert.equal(paymentPayload.items[0].offerId, 'offer-monthly');
    assert.equal(paymentPayload.customer.phone, '5511999999999');
  } finally {
    global.fetch = originalFetch;
    for (const [key, value] of Object.entries(previousEnvironment)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test('o webhook rejeita segredo incorreto e aceita o segredo configurado', async () => {
  const previousSecret = process.env.CAKTO_WEBHOOK_SECRET;
  process.env.CAKTO_WEBHOOK_SECRET = 'webhook-secret-test';

  const invoke = async (secret) => {
    const state = { status: 200, body: null, ended: false };
    const request = {
      method: 'POST',
      headers: {},
      query: {},
      body: { event: 'purchase_approved', secret, data: { id: 'order-test' } },
    };
    const response = {
      status(code) { state.status = code; return this; },
      json(body) { state.body = body; return this; },
      end() { state.ended = true; return this; },
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
