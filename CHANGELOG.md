# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-12-08

### ✨ Adicionado

- **Escala Completa 2026** - 220 slots com 3 irmãos por turno (660 aparições)
- **Sistema de Filtros**
  - Filtrar por irmão com busca em tempo real
  - Filtrar por mês
  - Visualizar filtros ativos
  - Botão "Limpar Filtros"
- **Modal de Estatísticas**
  - Total de aparições
  - Meses cobertos
  - Distribuição por turno (Manhã/Noite/Tarde)
  - Distribuição por dia (Domingo/Quarta/Sábado)
- **Exportação Profissional**
  - Header elegante com informações de filtros
  - Tabela formatada com cores e espaçamento
  - Destaque em amarelo para irmãos selecionados
  - Nomes separados por " - " para clareza
  - Legenda de cores
  - Pronto para impressão/PDF
- **Design Responsivo**
  - Funciona em desktop, tablet e mobile
  - Layout assimétrico elegante
  - Tipografia sofisticada (Cormorant Garamond + Inter)
  - Paleta de cores terrosa
- **Componentes shadcn/ui**
  - Button, Card, Dialog, Input, etc.
  - Acessibilidade nativa
  - Customização com Tailwind
- **Documentação Completa**
  - README detalhado
  - Guia de contribuição
  - Estrutura de projeto clara

### 🔧 Técnico

- React 19 com TypeScript
- Vite para build rápido
- Tailwind CSS 4 para styling
- Wouter para routing
- shadcn/ui para componentes
- pnpm para gerenciamento de dependências

### 🎯 Restrições Implementadas

- Mazino: 1x/mês (Domingo à Noite)
- Thiago: 2x/mês (Quartas à Noite)
- Williams: 3x/mês (sem Quartas)
- Adilson: Domingo à Noite (4x/mês)
- Eduardo, Elson, Henrique: Sem Quartas
- Todos os irmãos em todos os 12 meses

---

## Versões Futuras

### [1.1.0] - Planejado

- [ ] Notificação por WhatsApp
- [ ] Email semanal automático
- [ ] Integração com Google Calendar
- [ ] QR Code personalizado por irmão
- [ ] Filtro por turno

### [1.2.0] - Planejado

- [ ] Exportar em PDF direto
- [ ] Telegram Bot
- [ ] SMS automático
- [ ] Relatório detalhado com estatísticas

### [2.0.0] - Planejado

- [ ] Backend com Node.js/Express
- [ ] Banco de dados (PostgreSQL)
- [ ] Autenticação de usuários
- [ ] App mobile (React Native)
- [ ] Notificações push
- [ ] Sincronização em tempo real

---

## Como Contribuir

Se você deseja contribuir com melhorias ou correções, veja [CONTRIBUTING.md](CONTRIBUTING.md).

## Suporte

Para dúvidas ou problemas, abra uma [issue](https://github.com/seu-usuario/escala_porteiros_2026/issues).
