# Etapa 1: Build
FROM node:20-alpine AS builder

# Instalar PNPM globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar dependencias y lockfile
COPY pnpm-lock.yaml package.json ./

# Instalar dependencias sin ejecutar scripts
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Compilar la aplicación NestJS
RUN pnpm build

# Etapa 2: Producción
FROM node:20-alpine

# Instalar PNPM nuevamente
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

# Solo instalar dependencias necesarias para producción
RUN pnpm install --frozen-lockfile --prod

# Copiar los archivos compilados desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Exponer el puerto de la aplicación NestJS
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main"]
