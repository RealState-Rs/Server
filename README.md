# server

![Node Version](https://img.shields.io/badge/node-v22.18.0-green)
![License](https://img.shields.io/badge/license-ISC-blue)
![Updated](https://img.shields.io/badge/last_updated-2025-08-09-orange)

> A Real State Server Side Project



## 🔧 Frameworks / Tools Detected
- Express
- TypeScript

## ⚙️ Config Files
- .env
- .gitignore
- tsconfig.json

## 📦 Dependencies
- @prisma/client
- cors
- dotenv
- express
- generata
- swagger-ui-express
- yamljs

## 🧪 Dev Dependencies
- @types/cors
- @types/express
- @types/node
- @types/swagger-ui-express
- @types/yamljs
- prisma
- ts-node-dev
- typescript
- wait-port

## 📁 Folder Structure
```
- docker-compose.yml
- dockerfile
- docs/
  - swagger.yaml
- package-lock.json
- package.json
- prisma/
  - schema.prisma
- src/
  - app.ts
  - config/
    - swagger.ts
  - server.ts
- tsconfig.json
```

## 📜 Scripts
- `dev`: ts-node-dev --respawn --transpile-only src/server.ts → Start the app in development mode
- `build`: tsc → Build the app for production
- `start`: node dist/server.js → Start the production server
- `prisma:generate`: prisma generate 
- `prisma:migrate`: prisma migrate dev 
- `start:dev`: wait-port db:5432 && npx prisma migrate deploy && npm run dev 

## 👤 Author
- Jm31

## 📝 License
- ISC
