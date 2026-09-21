# CineStream

Landing page e catálogo construídos com React, Vite e Tailwind CSS.

## Desenvolvimento

O aplicativo fica em `paginaVenda/paginaVenda`. Na raiz do repositório:

```bash
cd paginaVenda/paginaVenda
npm install
npm run dev
```

Para testar também a função serverless opcional de marketing:

```bash
npm run dev:api
```

Na primeira execução, a CLI da Vercel solicitará login e vinculação ao projeto.

## Verificação

```bash
npm run check
```

O comando executa lint, testes e build de produção. O deploy deve usar `paginaVenda/paginaVenda` como diretório raiz.

## Checkout

Os planos usam links públicos de checkout configurados em `src/data/subscriptionPlans.js`. Não há credenciais nem API de pagamento no navegador.

## Conteúdo comercial

Antes da publicação, confirme os links de checkout, as condições de cada plano, estoque, versões dos dispositivos e dados empresariais exibidos nas páginas legais.
