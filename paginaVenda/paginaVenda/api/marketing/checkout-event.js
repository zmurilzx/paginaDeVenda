import { isAllowedRequestOrigin } from '../_lib/security.js';

const allowedEvents = new Set([
  'checkout_started',
  'checkout_lead',
  'payment_attempt',
  'pix_generated',
  'payment_error',
  'purchase',
]);

const cleanString = (value, limit = 255) => {
  const text = String(value || '').trim();
  return text ? text.slice(0, limit) : '';
};

const cleanObject = (value = {}) =>
  Object.fromEntries(
    Object.entries(value)
      .filter(([, entryValue]) => ['string', 'number', 'boolean'].includes(typeof entryValue))
      .map(([key, entryValue]) => [key, typeof entryValue === 'string' ? entryValue.slice(0, 255) : entryValue]),
  );

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido.' });
  if (!isAllowedRequestOrigin(request)) return response.status(403).json({ error: 'Origem não permitida.' });

  const body = request.body || {};
  const event = cleanString(body.event, 80);
  if (!allowedEvents.has(event)) return response.status(400).json({ error: 'Evento inválido.' });

  const eventPayload = {
    event,
    page: cleanString(body.page, 160),
    occurredAt: cleanString(body.occurredAt, 40) || new Date().toISOString(),
    properties: cleanObject(body.properties),
  };

  console.info('Marketing event', eventPayload);

  if (process.env.MARKETING_WEBHOOK_URL) {
    try {
      await fetch(process.env.MARKETING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      });
    } catch (error) {
      console.error('Falha ao encaminhar evento de marketing.', { event, message: error.message });
    }
  }

  return response.status(202).json({ ok: true });
}
