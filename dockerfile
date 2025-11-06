FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Compila o TypeScript
RUN npm run build

# Fase de Produção
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma # Necessário para o SQLite

EXPOSE 3000

CMD ["node", "dist/main/server.js"]