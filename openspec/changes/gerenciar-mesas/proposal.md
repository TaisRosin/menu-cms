# Why

Implementar RF05 e substituir o aviso de Mesas por gestão integrada à API.

# What Changes

- Listar mesas ativas/inativas, cadastrar, editar nome/situação e excluir com confirmação.
- Validar nomes e booleanos, permitir cadastro inativo e corrigir DELETE /spots/:id.
- Retornar conflito para mesa vinculada a comanda, preservando histórico.

# Capabilities

## New Capabilities
- mesas: administração de mesas.

## Modified Capabilities
- navegacao-cms: substituir aviso de Mesas pela gestão integrada.

# Impact

CMS e domínio spots do backend. Nenhuma coluna nova ou dependência adicional prevista. Não alterar abertura/fechamento de comandas ou o projeto de referência.
