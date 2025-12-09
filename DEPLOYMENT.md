# Guia de Deploy

Este documento fornece instruções para fazer deploy da aplicação em diferentes plataformas.

## 🚀 Opções de Deploy

### 1. GitHub Pages (Gratuito)

**Vantagens:**
- Gratuito
- Integrado com GitHub
- Deploy automático com GitHub Actions
- Domínio customizado suportado

**Passo a Passo:**

1. Faça push do código para GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/escala_porteiros_2026.git
git branch -M main
git push -u origin main
```

2. Vá para Settings → Pages no seu repositório GitHub

3. Selecione "GitHub Actions" como source

4. O workflow `.github/workflows/build.yml` fará o deploy automaticamente

5. (Opcional) Configure domínio customizado em Settings → Pages → Custom domain

**Resultado:** Sua aplicação estará disponível em `https://seu-usuario.github.io/escala_porteiros_2026/`

---

### 2. Vercel (Recomendado)

**Vantagens:**
- Gratuito para projetos open source
- Deploy automático com Git
- Performance otimizada
- Domínio customizado gratuito
- Análise de performance

**Passo a Passo:**

1. Crie uma conta em [vercel.com](https://vercel.com)

2. Instale Vercel CLI:
```bash
npm i -g vercel
```

3. Deploy:
```bash
vercel
```

4. Siga as instruções interativas

**Resultado:** Sua aplicação estará em `https://seu-projeto.vercel.app/`

---

### 3. Netlify

**Vantagens:**
- Gratuito
- Deploy automático com Git
- Formulários integrados
- Funções serverless gratuitas
- Domínio customizado

**Passo a Passo:**

1. Crie uma conta em [netlify.com](https://netlify.com)

2. Instale Netlify CLI:
```bash
npm i -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

4. Ou conecte seu repositório GitHub para deploy automático

**Resultado:** Sua aplicação estará em `https://seu-site.netlify.app/`

---

### 4. AWS Amplify

**Vantagens:**
- Integrado com AWS
- Deploy automático
- Escalável
- Suporte a domínios customizados

**Passo a Passo:**

1. Crie uma conta AWS

2. Vá para AWS Amplify Console

3. Conecte seu repositório GitHub

4. Configure build settings:
   - Build command: `pnpm run build`
   - Build output directory: `dist`

5. Deploy automático será configurado

---

### 5. Docker + Qualquer Servidor

**Dockerfile:**

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build e Run:**

```bash
docker build -t escala-porteiros .
docker run -p 3000:3000 escala-porteiros
```

---

## 🔐 Variáveis de Ambiente

Se você adicionar variáveis de ambiente no futuro, crie um arquivo `.env.example`:

```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Escala Porteiros 2026
```

**Importante:** Nunca commite `.env` no Git. Use `.env.example` como template.

---

## 📊 Monitoramento

### Google Analytics

1. Crie uma propriedade em [analytics.google.com](https://analytics.google.com)

2. Adicione o script ao `client/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry (Monitoramento de Erros)

1. Crie uma conta em [sentry.io](https://sentry.io)

2. Instale o SDK:
```bash
pnpm add @sentry/react
```

3. Configure em `client/src/main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

---

## 🔄 Atualizações Contínuas

### GitHub Actions para Deploy Automático

O arquivo `.github/workflows/build.yml` já está configurado para:

1. Rodar testes e lint em cada push
2. Fazer build automático
3. Deploy automático para GitHub Pages quando push em `main`

### Versionamento Semântico

Siga [Semantic Versioning](https://semver.org/lang/pt-BR/):

- **MAJOR** (1.0.0): Mudanças incompatíveis
- **MINOR** (1.1.0): Novas features compatíveis
- **PATCH** (1.0.1): Correções de bugs

Exemplo de commit:
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## 🆘 Troubleshooting

### Build falha com erro de dependências

```bash
# Limpe cache e reinstale
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

### Aplicação não carrega após deploy

1. Verifique se `dist/` foi gerado corretamente
2. Verifique as variáveis de ambiente
3. Verifique o console do navegador para erros
4. Limpe cache do navegador (Ctrl+Shift+Delete)

### Domínio customizado não funciona

1. Verifique registros DNS
2. Aguarde propagação DNS (pode levar 24h)
3. Verifique certificado SSL

---

## 📚 Recursos Adicionais

- [Documentação Vite](https://vitejs.dev/)
- [Documentação React](https://react.dev/)
- [Documentação Tailwind](https://tailwindcss.com/)
- [Guia GitHub Pages](https://docs.github.com/en/pages)
- [Guia Vercel](https://vercel.com/docs)
- [Guia Netlify](https://docs.netlify.com/)

---

**Pronto para fazer deploy!** 🚀
