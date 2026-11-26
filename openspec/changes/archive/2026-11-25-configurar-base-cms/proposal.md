# Proposal

## Why

O CMS possui documentação e repositório, mas ainda não pode ser executado. A base precisa permitir a instalação, configuração de ambiente e navegação antes da implementação dos domínios.

## What Changes

- Configurar o projeto com a stack e as convenções do `menu-frontend`.
- Criar layout administrativo e rotas com indicação explícita das funcionalidades ainda não implementadas.
- Preparar a instância Axios e os providers, sem consultas ou dados operacionais nesta mudança.
- Adicionar README, `.env.example` e regras de exclusão do Git.

## Capabilities

### New Capabilities

- `ambiente-cms`: instalação, execução local e configuração do endereço da API.
- `navegacao-cms`: acesso às seções administrativas pelo menu e por URL.

### Modified Capabilities

Nenhuma.

## Impact

Somente o repositório `cms`. Sem alterações no backend ou no cardápio, sem CRUD e sem mudança de banco. Os requisitos funcionais dos domínios serão especificados nas mudanças seguintes, incluindo as adequações P01–P09.
