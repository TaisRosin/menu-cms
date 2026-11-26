# mesas Specification

## Purpose
Permitir administrar mesas com nome e situação, preservando vínculos e histórico de comandas.

## Requirements

### Requirement: Listagem de mesas
O CMS SHALL listar mesas ativas e inativas com nome, situação e ações, tratando carregamento, erro e vazio.

#### Scenario: Mesa inativa
- **WHEN** uma mesa é desativada
- **THEN** permanece visível na listagem para edição e reativação

### Requirement: Cadastro e edição validados
O CMS e a API SHALL validar nome com 1–60 caracteres após trim e situação booleana, preservando campos omitidos em PATCH.

#### Scenario: Cadastro inativo
- **WHEN** um cadastro válido informa active=false
- **THEN** a mesa é persistida inativa

#### Scenario: Dados inválidos
- **WHEN** nome vazio, longo, null ou situação não booleana são enviados
- **THEN** a gravação é rejeitada sem modificar a mesa

### Requirement: Exclusão e integridade
O CMS SHALL confirmar a exclusão identificando a mesa e informar erros de vínculo.

#### Scenario: Comanda vinculada
- **WHEN** uma mesa possui comanda aberta ou encerrada
- **THEN** DELETE retorna 409 e preserva mesa e comanda

#### Scenario: Cancelamento
- **WHEN** a pessoa cancela a confirmação
- **THEN** nenhuma requisição de exclusão é enviada
