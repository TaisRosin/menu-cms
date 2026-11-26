# Proposal

## Why

A seção de Categorias ainda é um aviso de implementação pendente. O restaurante precisa administrar categorias reais, mas a API apresenta as limitações P01, P04 e P05 registradas em `docs/requisitos.md`.

## What Changes

- Implementar listagem, cadastro, edição e exclusão confirmada em `/categories`.
- Adequar a API para ordem de exibição, situação no cadastro, edição e remoção do ícone e exclusão por UUID.
- Aplicar validação ao domínio de categorias (parte de P09) e retornar conflito quando a categoria possuir produtos vinculados.
- Substituir o aviso inicial somente na seção de Categorias.

## Capabilities

### New Capabilities

- `categorias`: administração das categorias e persistência pela API.

### Modified Capabilities

- `navegacao-cms`: permitir que Categorias apresente sua funcionalidade implementada, mantendo os avisos nas demais seções.

## Impact

CMS: página e domínio de categorias e componentes shadcn necessários. Backend: entidade, DTOs, controller e service de categorias, com testes focados. Banco: inclusão aditiva de ordem, preservando registros e vínculos. Não implementar Produtos, Mesas, Comandas ou Pedidos nem alterar o frontend do cardápio. Novos campos e comportamentos abaixo são o contrato alvo desta mudança, ainda não disponíveis na API.
