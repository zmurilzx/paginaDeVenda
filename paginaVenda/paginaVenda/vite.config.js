import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import configHandler from './api/cakto/config.js';
import paymentHandler from './api/cakto/payment.js';
import statusHandler from './api/cakto/status.js';
import webhookHandler from './api/cakto/webhook.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const localApiHandlers = {
  '/api/cakto/config': configHandler,
  '/api/cakto/payment': paymentHandler,
  '/api/cakto/status': statusHandler,
  '/api/cakto/webhook': webhookHandler,
};

const readJsonBody = (request) => new Promise((resolve, reject) => {
  if (!['POST', 'PUT', 'PATCH'].includes(request.method)) return resolve({});

  const chunks = [];
  let size = 0;
  request.on('data', (chunk) => {
    size += chunk.length;
    if (size > 1_000_000) {
      reject(new Error('Corpo da requisição muito grande.'));
      request.destroy();
      return;
    }
    chunks.push(chunk);
  });
  request.on('end', () => {
    if (!chunks.length) return resolve({});
    try {
      resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
    } catch {
      reject(new Error('JSON inválido.'));
    }
  });
  request.on('error', reject);
});

const localCaktoApi = () => ({
  name: 'cinestream-local-cakto-api',
  configureServer(server) {
    server.middlewares.use(async (incomingRequest, outgoingResponse, next) => {
      const url = new URL(incomingRequest.url, 'http://localhost');
      const handler = localApiHandlers[url.pathname];
      if (!handler) return next();

      try {
        const body = await readJsonBody(incomingRequest);
        const request = {
          method: incomingRequest.method,
          headers: incomingRequest.headers,
          query: Object.fromEntries(url.searchParams.entries()),
          body,
        };
        const response = {
          status(code) {
            outgoingResponse.statusCode = code;
            return this;
          },
          json(data) {
            outgoingResponse.setHeader('Content-Type', 'application/json; charset=utf-8');
            outgoingResponse.end(JSON.stringify(data));
            return this;
          },
          end(data) {
            outgoingResponse.end(data);
            return this;
          },
        };

        await handler(request, response);
      } catch (error) {
        if (!outgoingResponse.headersSent) {
          outgoingResponse.statusCode = 400;
          outgoingResponse.setHeader('Content-Type', 'application/json; charset=utf-8');
        }
        if (!outgoingResponse.writableEnded) {
          outgoingResponse.end(JSON.stringify({ error: error.message || 'Falha na API local.' }));
        }
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, __dirname, '');
  Object.entries(environment)
    .filter(([key]) => key.startsWith('CAKTO_'))
    .forEach(([key, value]) => { process.env[key] = value; });

  return {
    plugins: [react(), localCaktoApi()],
    define: {
      'import.meta.env.VITE_CAKTO_CLIENT_ID': JSON.stringify(
        mode === 'development' ? environment.CAKTO_CLIENT_ID || '' : '',
      ),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      target: 'es2020',
      sourcemap: false,
    },
  };
});
