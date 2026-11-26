# Why

Concluir RF03/RF04: administrar produtos reais, incluindo inativos, categoria, preço e indicadores.

# What Changes

- CRUD com filtro por categoria, formulário validado e confirmação de exclusão.
- API com vegetarian e isNew (booleanos, padrão false), includeInactive opcional, preço positivo e edição parcial.
- Preservar listagem ativa padrão do cardápio e registros existentes.

# Capabilities

## New Capabilities
- produtos: administração de produtos no CMS.

## Modified Capabilities
- navegacao-cms: Produtos substitui o aviso de implementação pendente.

# Impact

CMS, domínio products do backend e duas colunas aditivas no PostgreSQL. Sem dependências novas.
