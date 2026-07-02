let sdkPromise;
let antifraudInitialized = false;

const loadScript = () => new Promise((resolve, reject) => {
  if (window.Cakto?.CaktoSDK) return resolve();

  const existing = document.querySelector('script[data-cakto-sdk]');
  if (existing) {
    existing.addEventListener('load', resolve, { once: true });
    existing.addEventListener('error', () => reject(new Error('Falha ao carregar o checkout seguro.')), { once: true });
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://cakto-sdk.pages.dev/cakto-sdk.min.js';
  script.async = true;
  script.dataset.caktoSdk = 'true';
  script.onload = resolve;
  script.onerror = () => reject(new Error('Falha ao carregar o checkout seguro.'));
  document.head.appendChild(script);
});

export const getCaktoSdk = async () => {
  if (!sdkPromise) {
    sdkPromise = (async () => {
      let clientId = import.meta.env.VITE_CAKTO_CLIENT_ID;
      if (!clientId) {
        const response = await fetch('/api/cakto/config');
        const config = await response.json().catch(() => ({}));
        if (!response.ok || !config.clientId) throw new Error(config.error || 'Client ID público da Cakto não configurado.');
        clientId = config.clientId;
      }
      await loadScript();
      return new window.Cakto.CaktoSDK({ client_id: clientId });
    })();
  }
  return sdkPromise;
};

export const initCaktoAntifraud = async () => {
  const sdk = await getCaktoSdk();
  if (!antifraudInitialized) {
    await sdk.initAntifraud();
    antifraudInitialized = true;
  }
  return sdk;
};

export const completeCaktoAntifraud = async () => {
  const sdk = await initCaktoAntifraud();
  await sdk.completeAntifraudProfile();
  const reference = sdk.getAntifraudReference();
  if (!reference) throw new Error('Não foi possível validar o perfil antifraude.');
  return { sdk, reference };
};

export const cleanupCaktoAntifraud = async () => {
  if (!sdkPromise || !antifraudInitialized) return;
  const sdk = await sdkPromise;
  sdk.cleanupAntifraud();
  antifraudInitialized = false;
};
