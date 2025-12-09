# Escala para Irmãos Porteiros 2026 - Guia de Implantação

## 📋 Informações do Projeto

**Nome**: Escala para Irmãos Porteiros - Jardim São Luiz, Barueri, SP - 2026
**Tipo**: Website Estático (React 19 + Tailwind CSS 4)
**Status**: ✅ Pronto para Produção
**Versão**: 1.0.0

## 🎯 Funcionalidades

- ✅ Escala completa de 2026 (Janeiro a Dezembro)
- ✅ 15 participantes com distribuição equilibrada
- ✅ Filtro por nome de irmão
- ✅ Filtro por mês
- ✅ Cores diferenciadas para dias da semana
- ✅ Design responsivo (desktop e mobile)
- ✅ Todas as restrições respeitadas

## 📊 Restrições Implementadas

1. **Mazino**: 1x/mês, apenas Domingo à Noite
2. **Thiago**: 2x/mês, apenas Quartas-feiras
3. **Williams**: 3x/mês (distribuído)
4. **Adilson**: Apenas Domingo à Noite
5. **Eduardo, Elson, Henrique**: Sem Quartas-feiras
6. **Rotação equilibrada**: 35 aparições para maioria, 36 para Williams, 24 para Thiago, 12 para Mazino

## 🚀 Instalação Local

### Pré-requisitos
- Node.js 22.13.0+
- pnpm 10.4.1+

### Passos

```bash
# 1. Extrair os arquivos
tar -xzf escala_porteiros_2026_files.tar.gz
cd escala_porteiros_2026

# 2. Instalar dependências
pnpm install

# 3. Executar em desenvolvimento
pnpm dev

# 4. Acessar em http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
escala_porteiros_2026/
├── client/
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── pages/           # Páginas React
│   │   │   └── Home.tsx     # Página principal com escala
│   │   ├── lib/
│   │   │   └── scheduleData.ts  # Dados e lógica da escala
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── App.tsx          # Roteador principal
│   │   └── index.css        # Estilos globais
│   └── index.html           # HTML principal
├── package.json             # Dependências do projeto
└── README_DEPLOYMENT.md     # Este arquivo
```

## 🎨 Design

**Filosofia**: Warm Institutional Minimalism
- **Tipografia**: Playfair Display (títulos) + Lato (corpo)
- **Cores**: Paleta quente com acentos em terracota
- **Layout**: Assimétrico com painel de filtros à esquerda
- **Tema**: Claro (light mode)

## 📱 Cores dos Dias

- 🟡 **Domingo** (Amarelo/Gold)
- 🟢 **Quarta-feira** (Verde/Sage)
- 🟠 **Sábado** (Laranja/Burnt Orange)

## 🔧 Scripts Disponíveis

```bash
pnpm dev      # Inicia servidor de desenvolvimento
pnpm build    # Constrói para produção
pnpm preview  # Visualiza build de produção
pnpm check    # Verifica tipos TypeScript
pnpm format   # Formata código com Prettier
```

## 📦 Dependências Principais

- **React 19.0.0** - Framework UI
- **Tailwind CSS 4.1.14** - Utilitários CSS
- **shadcn/ui** - Componentes UI
- **Wouter 3.3.5** - Roteamento cliente
- **Lucide React** - Ícones

## 🌐 Implantação

### No Manus (Recomendado)
O site está pronto para publicação no Manus com um clique no botão "Publish".

### Em Outro Host
1. Execute `pnpm build`
2. Copie o conteúdo de `dist/public` para seu servidor web
3. Configure o servidor para servir `index.html` para todas as rotas

## 📞 Suporte

Para questões sobre a escala ou funcionalidades, consulte a análise detalhada em `schedule_stats_2026.md`.

## 📄 Licença

Projeto desenvolvido para a comunidade de Irmãos Porteiros - Jardim São Luiz, Barueri, SP.

---

**Data de Criação**: Dezembro 2025
**Versão**: 1.0.0
**Status**: ✅ Pronto para Produção
