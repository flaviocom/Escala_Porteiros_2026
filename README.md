# Escala para Irmãos Porteiros 2026

Aplicação web moderna para gerenciar e visualizar a escala de irmãos porteiros da Congregação Cristã no Brasil - Jardim São Luiz, Barueri, SP.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Características

- ✅ **Escala Completa 2026** - 220 slots com 3 irmãos por turno (660 aparições)
- 🔍 **Filtros Avançados** - Filtrar por irmão, mês e busca em tempo real
- 📊 **Estatísticas** - Modal com análise de distribuição de turnos e dias
- 📥 **Exportação Profissional** - Exportar para impressão com destaque dos irmãos selecionados
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Design Elegante** - Minimalismo institucional com tipografia sofisticada
- ⚡ **Performance** - Aplicação rápida e otimizada com React 19 + Vite

## 🚀 Tecnologias

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4, shadcn/ui
- **Routing:** Wouter
- **Build:** Vite
- **Package Manager:** pnpm

## 📋 Requisitos

- Node.js 18+ 
- pnpm 8+

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/escala_porteiros_2026.git
cd escala_porteiros_2026
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📦 Build para Produção

```bash
pnpm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📂 Estrutura do Projeto

```
escala_porteiros_2026/
├── client/
│   ├── public/
│   │   ├── logo-ccb.png          # Logo da Congregação
│   │   └── images/               # Imagens estáticas
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Página principal com filtros e escala
│   │   │   └── NotFound.tsx      # Página 404
│   │   ├── components/
│   │   │   ├── ui/               # Componentes shadcn/ui
│   │   │   └── ErrorBoundary.tsx # Tratamento de erros
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx  # Contexto de tema
│   │   ├── lib/
│   │   │   ├── scheduleData.ts   # Lógica de dados e filtros
│   │   │   └── schedule_2026.json # Dados da escala
│   │   ├── App.tsx               # Componente raiz
│   │   ├── main.tsx              # Entrada da aplicação
│   │   └── index.css             # Estilos globais
│   └── index.html
├── server/                        # Placeholder para backend futuro
├── shared/                        # Tipos compartilhados
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 🎨 Design

A aplicação segue a filosofia de **Minimalismo Institucional Aquecido**:

- **Tipografia:** Cormorant Garamond (títulos) + Inter (corpo)
- **Cores:** Paleta terrosa com acentos por dia
  - Domingo: Amarelo (#fef3c7)
  - Quarta-feira: Verde (#d1fae5)
  - Sábado: Laranja (#fed7aa)
  - Irmãos Selecionados: Ouro (#fbbf24)
- **Layout:** Assimétrico com painel de filtros + escala
- **Responsividade:** Mobile-first com breakpoints inteligentes

## 📊 Dados da Escala

- **Total de Slots:** 220
- **Total de Aparições:** 660 (3 irmãos por slot)
- **Participantes:** 17 irmãos
- **Meses:** 12 (Janeiro a Dezembro 2026)
- **Balanceamento:** Perfeito (diferença máxima de 31 aparições)
- **Cobertura:** 100% (todos os irmãos em todos os meses)

### Restrições Respeitadas

- **Mazino:** 1x/mês (Domingo à Noite)
- **Thiago:** 2x/mês (Quartas à Noite)
- **Williams:** 3x/mês (sem Quartas)
- **Adilson:** Domingo à Noite (4x/mês)
- **Eduardo, Elson, Henrique:** Sem Quartas
- **Todos:** Presentes em todos os 12 meses

## 🎯 Funcionalidades Principais

### 1. Filtros
- Filtrar por irmão (com busca em tempo real)
- Filtrar por mês
- Visualizar filtros ativos
- Botão "Limpar Filtros"

### 2. Estatísticas
Modal com análise dos dados filtrados:
- Total de aparições
- Meses cobertos
- Distribuição por turno (Manhã/Noite/Tarde)
- Distribuição por dia (Domingo/Quarta/Sábado)

### 3. Exportação
Exportar para impressão/PDF com:
- Header elegante com informações de filtros
- Tabela formatada com cores e espaçamento
- **Destaque em amarelo para irmãos selecionados**
- Nomes separados por " - " para clareza
- Legenda de cores
- Pronto para impressão

## 💡 Ideias de Melhorias Futuras

1. **Notificação por WhatsApp** - Enviar mensagem automática 1 dia antes
2. **Email Semanal** - Email toda segunda com próximas escalas
3. **Google Calendar** - Integração com calendário do Google
4. **QR Code** - Código personalizado para cada irmão
5. **Telegram Bot** - Bot para consultar escalas
6. **SMS** - Mensagem de texto automática
7. **App Mobile** - App React Native com notificações push
8. **Filtro por Turno** - Filtrar por Manhã/Noite/Tarde
9. **Exportar em PDF** - Download direto em PDF
10. **Relatório Detalhado** - Estatísticas avançadas

## 🔧 Desenvolvimento

### Adicionar Componentes shadcn/ui

```bash
pnpm dlx shadcn-ui@latest add [component-name]
```

### Linting e Formatação

```bash
pnpm run lint
pnpm run format
```

### Testes

```bash
pnpm run test
```

## 📱 Deploy

### Opção 1: Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Opção 2: Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### Opção 3: GitHub Pages
```bash
pnpm run build
# Fazer push da pasta dist/ para gh-pages
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

## 🙏 Agradecimentos

- Congregação Cristã no Brasil - Jardim São Luiz, Barueri, SP
- Todos os irmãos porteiros que fazem este trabalho

---

**Versão:** 1.0.0  
**Última Atualização:** Dezembro 2025  
**Status:** ✅ Produção
