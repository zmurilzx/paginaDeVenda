import { timingSafeEqual } from 'node:crypto';

const safeEqual = (received, expected) => {
  const left = Buffer.from(String(received || ''));
  const right = Buffer.from(String(expected || ''));
  return left.length === right.length && timingSafeEqual(left, right);
};

const getReceivedSecret = (request) => {
  const authorization = request.headers.authorization || '';
  return (
    request.headers['x-cakto-secret'] ||
    request.headers['x-webhook-secret'] ||
    authorization.replace(/^Bearer\s+/i, '') ||
    request.query.secret ||
    request.body?.secret ||
    request.body?.data?.secret
  );
};

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido.' });

  const expectedSecret = process.env.CAKTO_WEBHOOK_SECRET;
  if (!expectedSecret) return response.status(503).json({ error: 'Webhook ainda não configurado.' });
  if (!safeEqual(getReceivedSecret(request), expectedSecret)) {
    return response.status(401).json({ error: 'Assinatura do webhook inválida.' });
  }

  const event = request.body?.event || request.body?.type || request.body?.data?.event || 'unknown';
  const orderId = request.body?.order?.id || request.body?.data?.order?.id || request.body?.data?.id || null;

  console.info('Cakto webhook recebido', { event, orderId });
  return response.status(204).end();
}
