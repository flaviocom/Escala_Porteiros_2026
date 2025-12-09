# Contribuindo para Escala Porteiros 2026

Obrigado por considerar contribuir para este projeto! Este documento fornece diretrizes e instruções para contribuir.

## 📋 Código de Conduta

Este projeto adota um Código de Conduta para garantir um ambiente acolhedor e respeitoso para todos. Esperamos que todos os contribuidores sigam este código.

## 🐛 Reportando Bugs

Antes de criar um relatório de bug, verifique se o problema já foi reportado. Se você encontrar um bug:

1. **Use um título claro e descritivo** para o issue
2. **Descreva os passos exatos** para reproduzir o problema
3. **Forneça exemplos específicos** para demonstrar os passos
4. **Descreva o comportamento observado** e o que você esperava ver
5. **Inclua screenshots ou GIFs** se possível
6. **Mencione sua versão** do Node.js, pnpm e navegador

## 💡 Sugerindo Melhorias

Sugestões de melhorias são sempre bem-vindas! Para sugerir uma melhoria:

1. **Use um título claro e descritivo**
2. **Forneça uma descrição detalhada** da melhoria sugerida
3. **Liste alguns exemplos** de como a melhoria seria útil
4. **Mencione outras aplicações** que implementam algo similar

## 🔄 Pull Requests

- Preencha o template de PR completamente
- Siga os estilos de código do projeto
- Inclua screenshots para mudanças na UI
- Termine todos os arquivos com uma nova linha
- Evite commits grandes - mantenha PRs focados

### Processo de PR

1. Fork o repositório e crie sua branch a partir de `main`
2. Se você adicionou código que deve ser testado, adicione testes
3. Certifique-se que o test suite passa
4. Faça lint do seu código
5. Faça push para sua fork e abra um Pull Request

## 🎨 Guias de Estilo

### Git Commit Messages

- Use o imperativo ("Add feature" não "Added feature")
- Use a primeira pessoa ("Move cursor to..." não "Moves cursor to...")
- Limite a primeira linha a 72 caracteres ou menos
- Referencie issues e pull requests liberalmente após a primeira linha

Exemplo:
```
Add WhatsApp notification feature

- Implement WhatsApp API integration
- Add notification scheduling
- Update documentation

Closes #123
```

### JavaScript/TypeScript

- Use 2 espaços para indentação
- Use `const` por padrão, `let` quando necessário
- Use arrow functions quando apropriado
- Adicione comentários para código complexo

### CSS/Tailwind

- Use classes Tailwind em vez de CSS customizado quando possível
- Mantenha a ordem: layout → spacing → colors → typography
- Use variáveis CSS para cores reutilizáveis

### React

- Use functional components e hooks
- Nomeie componentes com PascalCase
- Use props descritivas
- Adicione PropTypes ou TypeScript types

## 🧪 Testando Localmente

```bash
# Instale dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm run dev

# Verifique se há erros de lint
pnpm run lint

# Build para produção
pnpm run build
```

## 📚 Documentação

- Mantenha o README.md atualizado
- Documente novas features no README
- Adicione comentários para código complexo
- Atualize CHANGELOG.md com mudanças significativas

## 🚀 Roadmap

Veja as [Issues](https://github.com/seu-usuario/escala_porteiros_2026/issues) para ver o que está sendo trabalhado e o que está planejado.

## ❓ Dúvidas?

Sinta-se livre para abrir uma issue com a tag `question`.

---

**Obrigado por contribuir!** 🙏
