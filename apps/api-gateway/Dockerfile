FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder /app/apps/api-gateway/dist ./dist
COPY --from=builder /app/apps/api-gateway/node_modules ./node_modules
COPY --from=builder /app/apps/api-gateway/package.json ./

USER nodejs

EXPOSE 8080

CMD ["node", "dist/index.js"]
