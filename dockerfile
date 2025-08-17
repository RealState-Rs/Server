FROM node:20-alpine

# Install required OS dependencies for Prisma and OpenSSL
RUN apk add --no-cache openssl bash

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Generate Prisma client inside the container (so it matches alpine-musl)
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
