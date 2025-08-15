# server

![Node Version](https://img.shields.io/badge/node-v22.18.0-green)
![License](https://img.shields.io/badge/license-ISC-blue)
![Updated](https://img.shields.io/badge/last_updated-2025-08-15-orange)

> RS Project Server



## 🔧 Frameworks / Tools Detected
- Express
- TypeScript

## ⚙️ Config Files
- .env
- .gitignore
- tsconfig.json

## 📦 Dependencies
- @apidevtools/swagger-parser
- @prisma/client
- bcrypt
- cors
- dotenv
- ejs
- express
- generata
- jsonwebtoken
- morgan
- multer
- nodemailer
- swagger-ui-express
- uuid
- wait-port
- winston
- winston-daily-rotate-file
- yamljs
- zod

## 🧪 Dev Dependencies
- @types/bcrypt
- @types/cors
- @types/ejs
- @types/express
- @types/jsonwebtoken
- @types/morgan
- @types/multer
- @types/node
- @types/nodemailer
- @types/swagger-ui-express
- @types/yamljs
- prisma
- ts-node-dev
- typescript

## 📁 Folder Structure
```
- README.md
- docker-compose.yml
- dockerfile
- docs/
  - components/
    - security-scheme.yaml
  - openapi.yaml
  - paths/
    - auth/
      - forget-password.yaml
      - login.yaml
      - register.yaml
      - reset-password.yaml
      - upload-national-id.yaml
    - users/
      - admin-user-verifications.yaml
      - get-users.yaml
- generated/
  - prisma/
    - client.d.ts
    - client.js
    - default.d.ts
    - default.js
    - edge.d.ts
    - edge.js
    - index-browser.js
    - index.d.ts
    - index.js
    - libquery_engine-debian-openssl-3.0.x.so.node
    - libquery_engine-linux-musl-openssl-3.0.x.so.node
    - package.json
    - runtime/
      - edge-esm.js
      - edge.js
      - index-browser.d.ts
      - index-browser.js
      - library.d.ts
      - library.js
      - react-native.js
      - wasm-compiler-edge.js
      - wasm-engine-edge.js
    - schema.prisma
    - wasm.d.ts
    - wasm.js
- logs/
  - 2025-08-10-combined.log.gz
  - 2025-08-10-error.log
  - 2025-08-11-combined.log
  - 2025-08-11-error.log
  - 2025-08-14-combined.log
  - 2025-08-14-error.log
  - 2025-08-15-combined.log
  - 2025-08-15-error.log
  - combined.log
  - error.log
- package-lock.json
- package.json
- prisma/
  - migrations/
    - 20250809012022_init_schema/
      - migration.sql
    - 20250810143129_add_reset_code/
      - migration.sql
    - 20250810143517_changed_thetypeof_reset/
      - migration.sql
    - 20250814205330_add_national_id_validation/
      - migration.sql
    - 20250814210250_made_id_optional/
      - migration.sql
    - migration_lock.toml
  - schema.prisma
- src/
  - Helpers/
    - generateToken.ts
    - hashPassword.ts
  - app.ts
  - config/
    - db.ts
    - multer.ts
    - sendMail.ts
    - swagger.ts
  - middlewares/
    - auth.middleware.ts
    - error.middleware.ts
    - requestLogger.ts
  - modules/
    - auth/
      - auth.controller.ts
      - auth.routes.ts
      - auth.service.ts
      - auth.types.ts
      - auth.validators.ts
    - bootstrap.ts
    - users/
      - user.controller.ts
      - user.routes.ts
      - user.service.ts
      - user.types.ts
      - user.validators.ts
  - server.ts
  - types/
    - express/
      - index.d.ts
    - roles.ts
  - utils/
    - AppError.ts
    - logger.ts
    - prismaQueryBuilder.ts
    - responseFormatter.ts
  - views/
    - emails/
      - resetPassword.ejs
- tsconfig.json
- uploads/
  - verifications/
    - 0eb3c05f-070a-4d15-9d67-503627d9140f.jpg
    - 54561090-a61c-4d09-92be-b77f5b9a92e7.jpg
```

## 📜 Scripts
- `dev`: ts-node-dev --respawn --transpile-only src/server.ts → Start the app in development mode
- `build`: tsc → Build the app for production
- `start`: node dist/server.js → Start the production server
- `prisma:generate`: prisma generate 
- `prisma:migrate`: prisma migrate dev 
- `start:dev`: wait-port db:5432 && npx prisma migrate deploy && npm run dev 

## 👤 Author
- jm31,mohamed Tealab

## 📝 License
- ISC
