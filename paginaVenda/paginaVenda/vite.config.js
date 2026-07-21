import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import webhookHandler from './api/cakto/webhook.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const localApiHandlers = {
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

const localServerlessApi = () => ({
  name: 'cinestream-local-serverless-api',
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
    plugins: [react(), localServerlessApi()],
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
