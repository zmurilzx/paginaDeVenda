# CineStream

Landing page e catálogo construídos com React, Vite e Tailwind CSS.

## Desenvolvimento

O aplicativo fica em `paginaVenda/paginaVenda`. Na raiz do repositório:

```bash
cd paginaVenda/paginaVenda
npm install
npm run dev
```

Para testar também as funções serverless do checkout:

```bash
npm run dev:checkout
```

Na primeira execução, a CLI da Vercel solicitará login e vinculação ao projeto.

## Verificação

```bash
npm run check
```

O comando executa lint, testes e build de produção. O deploy deve usar `paginaVenda/paginaVenda` como diretório raiz.

## Checkout Cakto

O checkout interno usa funções serverless em `api/cakto`. Copie `.env.example` para `.env.local`, preencha as credenciais e IDs e execute `npm run dev:checkout`. O `client_secret` nunca deve usar o prefixo `VITE_` nem ser enviado ao navegador.

## Conteúdo comercial

Antes da publicação, confirme os links de checkout, as condições de cada plano, estoque, versões dos dispositivos e dados empresariais exibidos nas páginas legais.
