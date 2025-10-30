<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Assessoria Parlamentar

Website institucional para assessoria parlamentar especializada em assuntos legislativos.

## 🚀 Deploy

**Aplicação ao vivo:** https://assessoria-parlamentar-nyaafil1p-gaya-lex.vercel.app

## 📋 Sobre o Projeto

Este projeto contém uma aplicação React moderna construída com Vite, TypeScript e Tailwind CSS, oferecendo uma experiência completa para assessoria parlamentar.

## Run Locally

### Option 1: Using Node.js directly

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm run dev
   ```

### Option 2: Using Docker (Recommended)

**Prerequisites:** Docker and Docker Compose

#### Development with hot reloading:
```bash
docker-compose up --build
```
The app will be available at http://localhost:3000

#### Production build:
```bash
docker-compose -f docker-compose.prod.yml up --build
```
The app will be available at http://localhost

#### Additional commands:
```bash
# Run tests
docker-compose exec app npm test

# Run linting
docker-compose exec app npm run lint

# Build for production
docker-compose exec app npm run build
```

## 🚀 Deploy

### Vercel (Recomendado)

A aplicação está configurada para deploy automático no Vercel:

1. **Deploy automático:** Conectado ao repositório GitHub
2. **URL de produção:** https://assessoria-parlamentar-nyaafil1p-gaya-lex.vercel.app
3. **Configuração:** `vercel.json` com otimizações SPA

### Deploy Manual

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```
