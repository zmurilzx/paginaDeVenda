import { randomUUID } from 'node:crypto';
import { caktoRequest, isAllowedRequestOrigin, publicPaymentError } from '../_lib/cakto.js';
import { getPlanConfig } from '../_lib/plans.js';

const cleanDigits = (value) => String(value || '').replace(/\D/g, '');
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateCustomer = (customer = {}) => {
  const name = String(customer.name || '').trim().replace(/\s+/g, ' ');
  const email = String(customer.email || '').trim().toLowerCase();
  let phone = cleanDigits(customer.phone);
  const docNumber = cleanDigits(customer.docNumber);

  if (phone.length === 10 || phone.length === 11) phone = `55${phone}`;
  if (name.length < 3 || name.length > 120) throw new Error('Informe seu nome completo.');
  if (!isEmail(email) || email.length > 160) throw new Error('Informe um e-mail válido.');
  if (phone.length < 12 || phone.length > 13) throw new Error('Informe um telefone válido com DDD.');
  if (![11, 14].includes(docNumber.length)) throw new Error('Informe um CPF ou CNPJ válido.');

  return {
    name,
    email,
    phone,
    docType: docNumber.length === 11 ? 'cpf' : 'cnpj',
    docNumber,
  };
};

const safeMetadata = (metadata = {}) => {
  const allowedKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'sck'];
  return Object.fromEntries(
    allowedKeys
      .filter((key) => typeof metadata[key] === 'string' && metadata[key].length <= 255)
      .map((key) => [key, metadata[key]]),
  );
};

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido.' });
  if (!isAllowedRequestOrigin(request)) return response.status(403).json({ error: 'Origem não permitida.' });

  try {
    const body = request.body || {};
    const plan = getPlanConfig(body.plan);
    if (!plan) return response.status(400).json({ error: 'Plano inválido.' });

    const paymentMethod = body.paymentMethod;
    if (!['pix', 'threeDs'].includes(paymentMethod)) {
      return response.status(400).json({ error: 'Forma de pagamento inválida.' });
    }

    const customer = validateCustomer(body.customer);
    const deviceId = String(body.deviceId || '');
    const antifraudReference = String(body.antifraudReference || '').trim();
    if (deviceId.length < 8 || deviceId.length > 160) throw new Error('Sessão de pagamento inválida.');
    if (!antifraudReference || antifraudReference.length > 2048) throw new Error('Perfil antifraude inválido.');

    const idempotencyKey = /^[0-9a-f-]{36}$/i.test(body.idempotencyKey)
      ? body.idempotencyKey
      : randomUUID();

    const payload = {
      productId: plan.productId,
      paymentMethod,
      customer: { ...customer, fingerprint: deviceId },
      items: [{ offerId: plan.offerId }],
      antifraudProfilingAttemptReference: antifraudReference,
    };

    const metadata = safeMetadata(body.metadata);
    if (Object.keys(metadata).length) payload.metadata = metadata;

    if (paymentMethod !== 'pix') {
      if (!body.cardToken || typeof body.cardToken !== 'string') throw new Error('Token do cartão ausente.');
      payload.card = { token: body.cardToken };
      payload.threeDSecure = body.threeDSecure || {};
    }

    const result = await caktoRequest('/public_api/payments/', {
      method: 'POST',
      headers: { 'X-Idempotency-Key': idempotencyKey },
      body: JSON.stringify(payload),
    });

    return response.status(201).json({
      id: result.id,
      refId: result.refId,
      status: result.status,
      paymentMethod: result.paymentMethod,
      amount: result.amount,
      pix: result.pix
        ? { qrCode: result.pix.qrCode, qrCodeBase64: result.pix.qrCodeBase64, expiresAt: result.pix.expiresAt || result.pix.expirationDate }
        : undefined,
    });
  } catch (error) {
    const validationError = !error.status && error.message;
    return response.status(validationError ? 400 : error.status || 500).json({
      error: validationError || publicPaymentError(error),
    });
  }
}
