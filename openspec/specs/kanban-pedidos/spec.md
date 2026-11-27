# Kanban de pedidos

## Purpose
Acompanhar e mover pedidos entre os quatro status com persistência na API.

## Requirements

### Requirement: Quadro de pedidos
O CMS SHALL oferecer uma coluna para NEW, PREPARING, READY e DELIVERED, com cartões contendo mesa, itens e horário.

#### Scenario: Consulta inicial
- **WHEN** a página é aberta ou recarregada
- **THEN** cada pedido aparece na coluna do status retornado pela API

### Requirement: Movimento persistido
O CMS SHALL permitir arrastar e soltar cartões entre colunas e salvar por useMutation, com alternativa de seletor acessível pelo teclado.

#### Scenario: Movimento confirmado
- **WHEN** um cartão é solto em outra coluna
- **THEN** a API recebe PATCH de status e as consultas são invalidadas após sucesso

#### Scenario: Falha de gravação
- **WHEN** a API rejeita a mudança
- **THEN** o cartão permanece no status confirmado e a interface exibe erro com possibilidade de nova tentativa

#### Scenario: Cancelamento
- **WHEN** o cartão é solto fora das colunas ou na coluna atual
- **THEN** nenhum status é alterado
