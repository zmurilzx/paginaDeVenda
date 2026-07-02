import { caktoRequest, isAllowedRequestOrigin, publicPaymentError } from '../_lib/cakto.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Método não permitido.' });
  if (!isAllowedRequestOrigin(request)) return response.status(403).json({ error: 'Origem não permitida.' });

  const id = String(request.query.id || '');
  if (!/^[0-9a-f-]{36}$/i.test(id)) return response.status(400).json({ error: 'Pedido inválido.' });

  try {
    const order = await caktoRequest(`/public_api/orders/${id}/`);
    return response.status(200).json({
      id,
      refId: order.refId,
      status: order.status,
      paymentMethod: order.paymentMethod,
    });
  } catch (error) {
    return response.status(error.status === 404 ? 404 : 502).json({ error: publicPaymentError(error) });
  }
}
