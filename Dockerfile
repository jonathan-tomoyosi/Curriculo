# Imagem de produção do portfólio (deploy na Lightsail, atrás do nginx de entrada).
# Ver docs/DEPLOY.md.

# ---- dependências ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app
# `NEXT_PUBLIC_*` é embutido no bundle durante o build: a canônica precisa entrar aqui,
# não no `environment` do container.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Inclui o scripts/verify-trace.mjs: falha se as fontes do pdfkit ficarem fora do pacote.
RUN npm run build

# ---- execução ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3100

# O standalone não leva `public/` nem `.next/static/`: são copiados à parte.
COPY --from=build --chown=root:root /app/.next/standalone ./
COPY --from=build --chown=root:root /app/.next/static ./.next/static
COPY --from=build --chown=root:root /app/public ./public

# Código é do root e o processo roda como `node`: mesmo com o sistema de arquivos
# gravável, o processo não conseguiria alterar o próprio código.
USER node
EXPOSE 3100
CMD ["node", "server.js"]
