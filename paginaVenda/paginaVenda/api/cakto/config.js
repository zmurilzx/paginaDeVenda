import { isAllowedRequestOrigin } from '../_lib/cakto.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Método não permitido.' });
  if (!isAllowedRequestOrigin(request)) return response.status(403).json({ error: 'Origem não permitida.' });

  const clientId = process.env.CAKTO_CLIENT_ID;
  if (!clientId) return response.status(503).json({ error: 'Checkout ainda não configurado.' });
  return response.status(200).json({ clientId });
}
