const CAKTO_BASE_URL = 'https://api.cakto.com.br';

let tokenCache = null;

const getCredentials = () => {
  const clientId = process.env.CAKTO_CLIENT_ID;
  const clientSecret = process.env.CAKTO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Credenciais da Cakto não configuradas.');
  }

  return { clientId, clientSecret };
};

export const getAccessToken = async () => {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.value;
  }

  const { clientId, clientSecret } = getCredentials();
  const response = await fetch(`${CAKTO_BASE_URL}/public_api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error('Falha ao autenticar com a Cakto.');
  }

  tokenCache = {
    value: data.access_token,
    expiresAt: Date.now() + Math.max(Number(data.expires_in || 3600) - 60, 60) * 1000,
  };

  return tokenCache.value;
};

export const caktoRequest = async (path, options = {}) => {
  const token = await getAccessToken();
  const response = await fetch(`${CAKTO_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error('A Cakto recusou a operação.');
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
};

export const isAllowedRequestOrigin = (request) => {
  const origin = request.headers.origin;
  if (!origin) return true;

  try {
    const { hostname } = new URL(origin);
    return (
      hostname === 'cinestreamoficial.site' ||
      hostname === 'www.cinestreamoficial.site' ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.vercel.app')
    );
  } catch {
    return false;
  }
};

export const publicPaymentError = (error) => {
  if (error?.status === 400 || error?.status === 409) {
    const detail = error.details?.detail;
    if (typeof detail === 'string' && detail.length < 240) return detail;

    const firstFieldError = Object.entries(error.details || {})
      .find(([, value]) => Array.isArray(value) && typeof value[0] === 'string' && value[0].length < 240);
    if (firstFieldError) return firstFieldError[1][0];
  }

  if (error?.status === 429) return 'Muitas tentativas. Aguarde um minuto e tente novamente.';
  return 'Não foi possível processar o pagamento agora. Tente novamente ou fale com o suporte.';
};
